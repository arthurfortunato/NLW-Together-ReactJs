import { useHistory } from 'react-router-dom';

import illustrationImg from '../assets/illustration.svg';
import logoImg from '../assets/logo.svg';
import googleIconImg from '../assets/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';

export function Home() {
  const history = useHistory();

  function navigateToNewRoom() {
    history.push('/rooms/new');
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="ilustração simbolizando perguntas e respostas" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>

      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />

          <button onClick={navigateToNewRoom} className="create-room">
            <img src={googleIconImg} alt="Logo da Google" />
            Crie sua sala com Google
          </button>

          <div className="separator">ou entre em uma sala</div>

          <form>
            <input
              type="text"
              placeholder="Digite o código da sala"
            />
            <Button type="submit">
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}