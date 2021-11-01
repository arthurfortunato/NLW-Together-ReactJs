import { ReactNode } from 'react';

import cName from 'classnames';

import './styles.scss';

type QuestionProps = {
  content: string;
  user: {
    name: string;
    avatar: string;
  }
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
}

export function Question({
  content,
  user,
  isAnswered = false,
  isHighLighted = false,
  children,
}: QuestionProps) {

  /*  <div className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted ? 'highlighted' : ''}`}> */
  return (
    <div className={cName(
      'question',
      { answered: isAnswered },
      { highlighted: isHighLighted && !isAnswered },
    )}
    >

      <p>{content}</p>
      <footer>
        <div className="user-info">
          <img src={user.avatar} alt={user.name} />
          <span>{user.name}</span>
        </div>
        <div>
          {children}
        </div>
      </footer>
    </div>
  );
}