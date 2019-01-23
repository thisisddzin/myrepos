import React, { Fragment } from 'react';

import api from '../../services/api';

import logo from '../../assets/coding.svg';

import { Container, Form } from './style';

import CompareList from '../../components/CompareList';
import Footer from '../../components/Footer';

class Main extends React.Component {
  state = {
    repositoryInput: '',
    repositories: [],
    error: null,
    loading: false,
  };

  componentDidMount() {
    this.setState({ repositories: this.storage() });
  }

  storage = () => JSON.parse(localStorage.getItem('@repositories')) || [];

  handleAddRepository = async (e) => {
    e.preventDefault();

    this.setState({ error: null, loading: true });

    const { repositories, repositoryInput } = this.state;

    api
      .get(`/repos/${repositoryInput}`)
      .then((repo) => {
        if (repositories.find(_repo => _repo.id === repo.data.id)) {
          return this.setState({
            error: 'Repositório duplicado.',
            loading: false,
          });
        }

        this.setState({
          repositories: [...repositories, repo.data],
          repositoryInput: '',
          loading: false,
        });

        localStorage.setItem('@repositories', JSON.stringify([...repositories, repo.data]));
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          return this.setState({
            error: 'Repositório não encontrado.',
            loading: false,
          });
        }
        this.setState({
          error: 'Erro na conexão, tente novamente',
          loading: false,
        });
      });
  };

  handleRemoveRepository = (id) => {
    this.setState({ loading: true });

    const { repositories } = this.state;

    const newRepositories = repositories.filter(repo => repo.id !== id);

    this.setState({ repositories: newRepositories, loading: false });

    localStorage.setItem('@repositories', JSON.stringify(newRepositories));

    console.log(this.state.repositories);
  };

  handleRefreshRepository = async (fullName) => {
    this.setState({ loading: true, error: null });

    const { repositories } = this.state;

    try {
      const updateRepo = await api.get(`/repos/${fullName}`);

      this.setState({
        repositories: repositories.map(repo => (repo.full_name === fullName ? updateRepo.data : repo)),
      });
      console.log(repositories);

      await localStorage.setItem('@repositories', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ loading: false, error: err.message });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      error, loading, repositoryInput, repositories,
    } = this.state;

    return (
      <Fragment>
        <Container>
          <img src={logo} alt="Logo" height="120" />
          <Form withError={error} onSubmit={this.handleAddRepository}>
            <input
              type="text"
              value={repositoryInput}
              onChange={e => this.setState({ repositoryInput: e.target.value })}
              placeholder="usuário/repositório"
            />
            <button type="submit" disabled={loading}>
              {loading ? (
                <i className="fa fa-spinner fa-pulse" />
              ) : (
                <i className="fa fa-angle-double-right" />
              )}
            </button>
          </Form>
          {error ? <span>{error}</span> : null}
          <CompareList
            repositories={repositories}
            refreshRepository={this.handleRefreshRepository}
            removeRepository={this.handleRemoveRepository}
            loading={loading}
          />
        </Container>
        <Footer />
      </Fragment>
    );
  }
}

export default Main;
