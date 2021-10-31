import logoImg from '../../assets/logo.svg';
import { Button } from '../../components/Button';
import { RoomCode } from '../../components/RoomCode';

import { useParams } from 'react-router-dom';

import './styles.scss';

import { FormEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';
import { database } from '../../services/firebase';
import { Question } from '../../components/Question';
import { useRoom } from '../../hooks/useRoom';

type RoomParams = {
  id: string,
}

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);


  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      toast.error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      user: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighLighted: false,
      isAnswered: false
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntas?"
            onChange={event => setNewQuestion(event.target.value)}
            value={newQuestion}
          />

          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            )}

            <div>
              <Button type="submit" disabled={!user}>
                Enviar pergunta
              </Button>
              <Toaster
                position="top-right"
                reverseOrder={false}
              />
            </div>
          </div>
        </form>
        <div className="question-list">
          {questions.map(question => {
            return (
              <Question
                key={question.id}
                content={question.content}
                user={question.user}
              />
            )
          })}
        </div>
      </main>
    </div>
  )
}