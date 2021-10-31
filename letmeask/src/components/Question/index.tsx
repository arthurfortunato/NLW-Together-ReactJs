type QuestionProps = {
  content: string;
  user: {
    name: string;
    avatar: string;
  }
}

export function Question({ content, user }: QuestionProps) {
  return (
    <div className="question">
      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={user.avatar} alt={user.name} />
          <span>{user.name}</span>
        </div>
      </footer>
    </div>
  );
}