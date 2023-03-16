import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ("../")))
from pydantic import BaseModel
import logging
import uvicorn
from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
from data_base.DBToApi import DBToApi

class DogAnswer(BaseModel):
    question_id: int
    answer_id: int


class DogAnswers(BaseModel):
    answers: list[DogAnswer]


class Section(BaseModel):
    id: int
    title: str
    description: str


# TODO: disable cors on proud!
app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
db_connector = DBToApi()


@app.get("/")
def root():
    return {}


@app.get("/sections", status_code=200)
def get_sections(response: Response):
    """Get all sections from the database"""
    sections = db_connector.get_sections_ids()
    if not len(sections):
        response.status_code = status.HTTP_404_NOT_FOUND
    return {"sections": sections}


@app.get("/section/{section_id}")
def get_section(section_id: int):
    """Get a section by section id from database"""
    section_with_questions = db_connector.get_section_questions_with_answers(
        section_id)
    return section_with_questions

# TODO: needs to check if the dog owner is the user that sent the request
@app.post("/answers/{user_id}/{dog_id}", status_code=201)
def handle_user_answers(user_id: int, dog_id: int, dogAnswers: DogAnswers):
    req = dogAnswers.dict()
    db_connector.put_dogs_answers(dog_id, req.get("answers", []))
    return {"message": "answers inserted"}


def main():
    logging.basicConfig(level=logging.INFO)
    uvicorn.run(app)

if __name__ == "__main__":
    main()