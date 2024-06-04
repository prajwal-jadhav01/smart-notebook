import React from 'react'
import Navbar from './Navbar'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function About() {
  const a = useContext(noteContext)
  return (
    <>
    <Navbar />

    <h1>This is about section</h1>
    <h2>{a.name} is {a.age} years old</h2>
    </>
  )
}

export default About