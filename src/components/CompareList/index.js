import React from 'react';
import moment from 'moment';

import { Container, Repository } from './style';

moment.locale('pt-br');

const CompareList = ({ repositories, refreshRepository, removeRepository }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.name} />
          <strong>{repository.name}</strong>
          <small>{repository.full_name}</small>
        </header>

        <ul>
          <li>
            {repository.stargazers_count}
            {' '}
            <small>stars</small>
          </li>
          <li>
            {repository.forks}
            {' '}
            <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count}
            {' '}
            <small>issues</small>
          </li>
          <li>
            {moment(repository.updated_at).fromNow()}
            {' '}
            <small>last commit</small>
          </li>
          <li>
            {repository.language}
            {' '}
            <small>language</small>
          </li>
        </ul>
        <button
          title="Atualizar"
          onClick={() => refreshRepository(repository.full_name)}
          className="update"
        >
          <i className="fa fa-hammer" />
        </button>
        <button title="Apagar" onClick={() => removeRepository(repository.id)} className="delete">
          <i className="fa fa-bug" />
        </button>
        <a
          title="Acessar"
          href={repository.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          <i className="fas fa-anchor" />
        </a>
      </Repository>
    ))}
  </Container>
);

export default CompareList;
