import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type FirebaseQuestions = Record<string, {
  user: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;
}>


type QuestionType = {
  id: string;
  user: {
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighLighted: boolean;

}

export function useRoom(roomId: string) {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val()
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQUestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          user: value.user,
          isHighLighted: value.isHighLighted,
          isAnswered: value.isAnswered,
        }
      })
      setTitle(databaseRoom.title)
      setQuestions(parsedQUestions)
    })
  }, [roomId])


  return { questions, title }
}