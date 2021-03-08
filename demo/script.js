import { Builder } from '../builder.js'
const button = document.getElementById('button')
const buttonTwo = document.getElementById('button2')
const output = document.getElementById('output')
const input = document.getElementById('input1')
const inputTwo = document.getElementById('input2')

const build = new Builder

button.addEventListener("click", buildQuery)
buttonTwo.addEventListener("click", buildMutation)

function buildQuery() {
	const value = input.value
	const valueTwo = inputTwo.value
  const query = build.query('getUsers')({ value, valueTwo, token: 'aehaueha' })('status', {'message': ['ola', { teste: 'olar', 'teste': ['abc', 'bcd'] }, 'tchau']}, 'id', 'names', 'users')
  console.log(query)
	output.innerText = query
}

function buildMutation() {
	const value = [
		input.value,
		inputTwo.value,
		false
	]
  const mutation = build.mutation('aaa')({ value, 'userId': input.value, token: 'aehaueha', teste: false })('status', 'message', 'id', 'names', 'users')
  console.log(mutation)
	output.innerText = mutation
}