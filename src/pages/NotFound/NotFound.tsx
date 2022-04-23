import styled from 'styled-components';

const NotFound = () => {
  return (
    <Container>
      <Header>404</Header>
      <p>Not Found</p>
    </Container>
  );
};

export default NotFound;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 20px;
`;

const Header = styled.h1`
  margin-bottom: 10px;
`;
