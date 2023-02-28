from sqlalchemy import create_engine
from contextlib import contextmanager
from typing import Generator
from sqlalchemy.engine import Engine, Connection
import os
from dotenv import load_dotenv
import logging


class SQLAlchemyConnection:
    """Class to get sqlalchemy connection"""
    # TODO: change
    load_dotenv()

    def __init__(self) -> None:
        self.url = self._parse_db_url(os.environ["DB_URL"])
        self.db: Engine | None = None

    def _parse_db_url(self, url: str) -> str:
        """Parse the connection url to one that satisfies the sqlalchemy requirements"""
        return url.replace("postgres://", "postgresql://")

        # perform to_sql test and print result
    def _create_db(self) -> Engine:
        """Create sqlalchemy engine"""
        logging.info("creating db engine")
        self.db = create_engine(self.url)

    @contextmanager
    def get_engine(self) -> Generator[Engine, None, None]:
        """Connecting to database and getting engine"""
        if not self.db:
            self._create_db()
        try:
            yield self.db
        finally:
            logging.info("disposing db engine")
            self.db.dispose()
            self.db = None

    def connect(self) -> Connection:
        """Get sqlalchemy connection"""
        "TODO: make this generator also"
        if not self.db:
            self._create_db()
        return self.db.connect()
