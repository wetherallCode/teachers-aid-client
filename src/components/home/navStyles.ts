import styled from 'styled-components'
import { motion } from 'framer-motion'
import { media } from '../../styled/media'

export const MenuNav = styled(motion.nav)`
  position: fixed;

  left: 0;
  ${media.iPhone} {
    width: 30vw;
  }
  width: 15vw;
  height: 100vh;
  background: var(--blue);
  border-left: 3px solid var(--white);
  border-top: 3px solid var(--white);
  box-shadow: 3px 3px 3px 3px black;
  padding-left: 20px;
  padding-top: 20px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    padding: 0;
    margin: 0 0 1rem;
    ${media.iPhone} {
      font-size: 1rem;
    }
    font-size: 2rem;
    width: 90%;
    &:hover {
      border-bottom: 2px solid var(--grey);
      font-size: 2.2rem;
    }
    color: white;
    text-decoration: none;
    border-bottom: 2px transparent solid;
    transition: 0.3s ease border;
    a {
      color: white;
      text-decoration: none;
    }
  }
`
