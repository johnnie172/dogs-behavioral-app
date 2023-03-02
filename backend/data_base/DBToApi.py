
import os
import sys
# TODO: fix relative paths
sys.path.insert(0, os.path.dirname(__file__))
import logging
from PsycopgConnection import PsycopgConnection
from dotenv import load_dotenv
from pydantic import BaseModel
from typing import Optional


class DogAnswer(BaseModel):
    question_id: int
    answer_id: int


class Section(BaseModel):
    id: int
    title: str
    description: str


class Question(BaseModel):
    id: int
    content: str
    section_id: int
    ans_type: str
    subscale: str


class QuestionWithoutId(BaseModel):
    content: str
    section_id: int
    ans_type: str
    subscale: str


class Answer(BaseModel):
    id: int
    question_id: int
    content: str
    score: float | None
    string: str | None


class Questions(BaseModel):
    id: QuestionWithoutId
    answers: Optional[list[Answer]]


class SectionWithQuestions(BaseModel):
    section: Section
    questions: Questions


class DBToApi:
    def __init__(self):
        load_dotenv()
        self.url = os.environ.get("DB_URL")
        self._psyco = None

    @property
    def psyco(self):
        """PsycopgConnection object"""
        if not self._psyco:
            self._psyco = PsycopgConnection(self.url)
        return self._psyco

    def get_sections_ids(self) -> list[int]:
        """get all the sections ids from the database"""
        sql = "SELECT id FROM sections"

        with self.psyco.get_cursor() as cursor:
            cursor.execute(sql)
            records = cursor.fetchall()

        return [records[0] for records in records]

    def get_section_by_id(self, section_id: int) -> Section:
        """Get a section by id from the database"""
        # query the database
        sql = "SELECT * FROM sections WHERE id = %s"
        with self.psyco.get_cursor() as cursor:
            cursor.execute(sql, (section_id,))

            # get rows as list of dictionaries
            sections = self.psyco.get_dict(cursor)

        # return the section
        return sections[0]

    # TODO: create query for questions and answers together
    def get_questions_by_section_id(self, section_id: int) -> Questions:
        """Get questions by section_id from the database"""
        # query the database
        sql = "SELECT * FROM questions WHERE section_id = %s"
        with self.psyco.get_cursor() as cursor:
            cursor.execute(sql, (section_id,))

            # get rows as list of dictionaries
            questions = self.psyco.get_dict(cursor)

            # convert to dictionary and return
            questions = self.psyco.flat_list_to_dict(questions)
        return questions

    def get_answers_by_question_id(self, question_id: int) -> list[Answer]:
        """Get answers by question from the database"""
        # query the database
        sql = "SELECT * FROM answers WHERE question_id = %s"
        with self.psyco.get_cursor() as cursor:
            cursor.execute(sql, (question_id,))

            # convert to dictionary
            answers = self.psyco.get_dict(cursor)
        return answers

    def get_answers_for_questions(self, questions_ids: tuple[int]) -> list[Answer]:
        """Get answers for all questions from the database"""
        # query the database
        sql = "SELECT * FROM answers WHERE question_id in %s"

        with self.psyco.get_cursor() as cursor:
            cursor.execute(sql, (questions_ids,))

            # convert to dictionary
            answers = self.psyco.get_dict(cursor)
        return answers

    def get_section_questions_with_answers(self, section_id: int) -> SectionWithQuestions:
        """Get section and all of its questions with the corresponding answers from the data base"""

        # get section
        section_dict = self.get_section_by_id(section_id)

        # get questions
        questions = self.get_questions_by_section_id(section_id)
        questions_ids = tuple(questions.keys())

        # get answers
        answers = self.get_answers_for_questions(questions_ids)

        # create answers dictionary with all questions ids and init empty list
        answer_dict = {q_id: [] for q_id in questions_ids}

        # iterate answers and append each answer to the correct question
        for answer in answers:
            question_id = answer["question_id"]
            answer_dict[question_id].append(answer)

        # update questions dictionary with answers list
        for id, value in answer_dict.items():
            questions[id]["answers"] = value

        # return questions with answers dictionary
        return {"section": section_dict, "questions": questions}

    def create_dog_answer(self, dog_id: int, question_id: int, answer_id: int) -> tuple[str, DogAnswer]:
        cmd = "insert into dog_questionnaires (dog_id, question_id, answer_id) values (%s, %s, %s)"
        return cmd, (dog_id, question_id, answer_id)

    def put_dogs_answers(self, dog_id: int, answers: list[dict]) -> None:
        """Handle the client answers from api to sql"""
        # set empty list for answers
        answers_to_sql = []

        # iterate over answers list
        for answer in answers:

            # create answer for db
            question_id = answer.get("question_id")
            answer_id = answer.get("answer_id")

            # add the answer to the list
            dog_answer = self.create_dog_answer(
                dog_id, question_id, answer_id)
            answers_to_sql.append(dog_answer)

        # execute all the answers throw psycopg
        self.psyco.execute_commands(answers_to_sql)


def test():
    db = DBToApi()
    with db.psyco.get_cursor() as cursor:
        cursor.execute("""
            SELECT q.content AS ques_content, q.ans_type, a.content AS ans_content, a.score 
            FROM answers a
            JOIN questions q ON a.question_id = q.id
            where q.section_id=1;
        """)
        records = db.psyco.get_dict(cursor)
        # print(records)
    with db.psyco.get_cursor() as cursor:
        cursor.execute("""
            SELECT q.content AS ques_content, q.ans_type, a.content AS ans_content, a.score 
            FROM answers a
            JOIN questions q ON a.question_id = q.id
            where q.section_id=1;
        """)
        records = db.psyco.get_dict(cursor)
        # print(records)
    del db

    # section
    # section = db.get_section_by_id(1)
    # print(section)

    # questions
    # questions = db.get_questions_by_section_id(section["id"])
    # print(questions)

    # answers = db.get_answers_by_question_id(questions[0]["id"])
    # print(answers)

    # answers = db.get_answers_for_questions((1, 2, 3))
    # print(PsycopgConnection().flat_list_to_dict(answers, "id"))


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    test()
