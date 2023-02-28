import urllib.parse as up
from urllib.parse import ParseResult
from contextlib import contextmanager
from typing import Generator
import psycopg2
import psycopg2.extensions
from psycopg2.extras import RealDictCursor
import logging

# TODO: create protocol and change the typing of DB_connection class


class PsycopgConnection:
    """Class for creating a connection to a database"""
    def __init__(self, url: str) -> None:
        self.connections_params: dict | None = None
        self._parsed_url: ParseResult = self._parse_db_url(
            url)
        self._connection: psycopg2.extensions.connection | None = None

    @property
    def connection(self):
        if not self._connection:
            self._connection = self._connect()
            logging.info("creating connection")
            logging.info(f"connection is: {self._connection}")
        return self._connection

    # TODO: check if del needed
    def __del__(self):
        logging.info("closing db connection")
        self.connection.close()

    def _parse_db_url(self, url: str) -> ParseResult:
        """Parse the given url of the database and return a ParseResult"""
        up.uses_netloc.append("postgres")
        return up.urlparse(url)

    def _set_psycopg_params(self):
        """Set dictionary of parameters for psycopg connect function"""
        self.connections_params = {
            "database": self._parsed_url.path[1:],
            "user": self._parsed_url.username,
            "password": self._parsed_url.password,
            "host": self._parsed_url.hostname,
            "port": self._parsed_url.port
        }

    def _connect(self) -> psycopg2.extensions.connection:
        """connect to the pg database"""
        if not self.connections_params:
            self._set_psycopg_params()
        logging.info("connecting to db")
        return psycopg2.connect(**self.connections_params)

    @contextmanager
    def get_cursor(self) -> Generator[psycopg2.extensions.cursor, None, None]:
        """Connecting to database and getting cursor"""
        try:
            logging.info("using cursor")
            yield self.connection.cursor()
        except:
            logging.info("preforming rollback")
            self.connection.rollback()
            raise
        finally:
            logging.info("commit cursor")
            self.connection.commit()
            # conn.close()

    # @contextmanager
    # def get_dict_cursor(self) -> Generator[RealDictCursor, None, None]:
    #     """Connecting to database and getting dict cursor"""
    #     try:
    #         logging.info("using cursor")
    #         yield self.connection(cursor_factory=RealDictCursor)
    #     except:
    #         logging.info("preforming rollback")
    #         self.connection.rollback()
    #         raise
    #     finally:
    #         logging.info("commit cursor")
    #         self.connection.commit()
    #         # conn.close()

    def execute_command(self, command: str, data=None) -> None:
        """Execute SQL command"""
        # use cursor to execute command
        with self.get_cursor() as cursor:
            logging.info(f"Executing command: {command}")
            cursor.execute(command, data)
            logging.info(f"rows affected: {cursor.rowcount}")

    def execute_commands(self, commands: list[tuple[any]]) -> None:
        """Execute a list of SQL commands
        example for commands:
            commands = [("select * from table_name where id = (%s)", (1,) ) ,("DROP TABLE IF EXISTS s", ) ,("DROP TABLE IF EXISTS a", )]
        """
        # use cursor to execute the commands
        with self.get_cursor() as cursor:

            # iterate over commands and unpack them
            for cmd, data in commands:
                logging.info(f"Executing command: {cmd}")

                # execute the command
                cursor.execute(cmd, data)
                logging.info(f"rows affected: {cursor.rowcount}")

    def get_dict(self, cursor: psycopg2.extensions.cursor) -> list[dict]:
        """Get a dictionary from cursor"""
        return self.rows_to_dict(*self.get_columns_and_rows(cursor))

    def rows_to_dict(self, columns: psycopg2.extensions.Column, result: list[tuple]) -> list[dict]:
        """Parsing a list of columns and rows from cursor to dictionary"""
        # initialize empty results list
        results = []

        # iterate through rows and set column name and value to dict
        for row in result:
            row_dict = {}
            for i, col in enumerate(columns):
                row_dict[col.name] = row[i]
            results.append(row_dict)

        # return results
        return results

    def get_columns_and_rows(self, cursor: psycopg2.extensions.cursor) -> tuple[list[tuple]]:
        """Get the columns and rows from cursor"""
        return list(cursor.description), cursor.fetchall()

    def flat_list_to_dict(self, rows_list: list[dict], unique_column: str = "id") -> dict:
        """Convert a list of rows(dict) to a dictionary with primary key as key"""

        # init rows_dict
        rows_dict = {}

        # iterate over rows list
        for row in rows_list:

            # set row unique column key to dictionary key
            rows_dict[row[unique_column]] = row

            # remove unique column from the nested dictionary
            rows_dict[row[unique_column]].pop(unique_column)

        return rows_dict
