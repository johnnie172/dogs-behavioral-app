import sys
import os
sys.path.insert(0, os.path.dirname(__file__))
from dataclasses import dataclass
from SQLAlchemyConnection import SQLAlchemyConnection
from PsycopgConnection import PsycopgConnection
from files_utilities import get_abs_path, get_all_files_in_dir, parse_file_name_from_path
import psycopg2
import psycopg2.extensions
import logging
from dotenv import load_dotenv
from sqlalchemy.engine import Engine
import pandas as pd

@dataclass
class DogAnswer:
    dog_id: int
    question_id: int
    answer_id: int


def csv_to_postgres(file_path: str, *, table_name: str | None = None) -> None:
    """Read csv file and insert to postgres database table"""
    # set table name from file name or argument
    table_name = table_name if table_name else parse_file_name_from_path(
        path=file_path, file_type=".csv")

    # use cursor
    with PsycopgConnection().get_cursor() as cursor:

        # open csv and skip header line
        with open(file_path, ) as csv_file:
            next(csv_file)

            # copy csv to table
            cursor.copy_from(csv_file, table_name, sep=',', null="null")


def create_tables_from_file(file_path: str) -> None:
    """Create tables from sql file"""
    # execute create tables file
    with open(file_path) as file:
        PsycopgConnection().execute_command(file.read())


def drop_table(table_name: str) -> None:
    """Drop table with specified name"""
    PsycopgConnection().execute_command(f"DROP TABLE IF EXISTS {table_name}")


def delete_table_data(table_name: str) -> None:
    """Delete all rows from table"""
    PsycopgConnection().execute_command(f"DELETE FROM {table_name};")


def update_tables_from_csv_directory(csv_files: list[str]) -> None:
    """Update tables from csv files"""
    # iterate over files paths
    for csv_path in csv_files:
        # get table name
        table_name = parse_file_name_from_path(csv_path, ".csv")

        # delete existing data from table if exists and update data from file
        try:
            delete_table_data(table_name)
            csv_to_postgres(get_abs_path(csv_path))
        # log if the table not exists
        except psycopg2.errors.UndefinedTable:
            logging.error(f"Error updating table {table_name}")


def get_xlsx_df(file_path: str) -> pd.DataFrame:
    """Read xlsx file with pandas"""
    return pd.read_excel(get_abs_path(file_path))


def df_to_postgres(df: pd.DataFrame, table_name: str, engine: Engine) -> None:
    """Use pandas to_sql to update table"""
    rows_count = df.to_sql(table_name, con=engine,
                           if_exists='replace', index=False)
    logging.info(f"updated {rows_count} rows for {table_name} table")


def xlsx_to_postgres(file_path: str, *, table_name: str | None = None) -> None:
    """Read xlsx file and insert to postgres database table"""
    # set table name from file name or argument
    table_name = table_name if table_name else parse_file_name_from_path(
        path=file_path, file_type=".xlsx")

    # get data frame
    df = get_xlsx_df(file_path)

    # use sqlalchemy engine
    with SQLAlchemyConnection().get_engine() as engine:
        # update table
        df_to_postgres(df, table_name, engine)


def update_tables_from_xlsx_directory(xlsx_files: list[str]) -> None:
    """update tables from xlsx files"""
    # iterate through files paths and update tables
    for xlsx_path in xlsx_files:
        xlsx_to_postgres(xlsx_path)


def main() -> None:
    # load .env variables
    load_dotenv()

    # create logger
    logging.basicConfig(level=logging.INFO)


    # get dict from query
    # psyco = PsycopgConnection()
    # with psyco.get_cursor() as cursor:
    #     cursor.execute("select * from sections")
    #     print(psyco.get_dict(cursor))

    # sections = process_get_sections_ids()
    # section = get_section_by_id(sections[0])
    # print(section)


    # with PsycopgConnection().get_cursor() as cursor:
    #     cursor.execute("select * from sections")
    #     print(cursor.fetchall())
    # insert from csv
    # csv_file_path = get_abs_path("./csv_files/questions.csv")
    # drop_table("dog_questionnaires")

    # create_tables_from_file(get_abs_path("./create_tables.sql"))

    # csv_to_postgres(csv_file_path)

    # csv_files = get_all_files_in_dir(
    #     get_abs_path("./csv_files"), file_type=".csv")
    # update_tables_from_csv_directory(csv_files)

    # xlsx_files = get_all_files_in_dir(path=get_abs_path("./xlsx_files"),
    #     file_type=".xlsx")
    # update_tables_from_xlsx_directory(xlsx_files)

    # [create_dog_answer(1, 1, 5)]
    # cmd = "insert into dog_questionnaires (dog_id, question_id, answer_score) values (%s, %s, %s)"
    # commands = [(cmd, (1, 1, 5)), (cmd, (2, 1, 5)),
    #             (cmd, (3, 1, 5)), ("select * from dogs", tuple())]
    # cmds = [create_dog_answer(1, 1, 5), create_dog_answer(1, 1, 5)]
    # print(cmds)
    # PsycopgConnection().execute_command(*create_dog_answer(1, 1, 5))


    # for file in xlsx_files:
    #     drop_table(parse_file_name_from_path(path=file, file_type=".xlsx"))


if __name__ == "__main__":
    main()
