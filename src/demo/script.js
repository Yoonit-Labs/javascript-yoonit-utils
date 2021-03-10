import * as Builder from '../graphql/builder.js'
const button = document.getElementById('button')
const buttonTwo = document.getElementById('button2')
const output = document.getElementById('output')
const input = document.getElementById('input1')
const inputTwo = document.getElementById('input2')

button.addEventListener("click", buildQuery)
buttonTwo.addEventListener("click", buildMutation)

function buildQuery() {
	const value = input.value
	const valueTwo = inputTwo.value
  const query = Builder.query('getUsers')({ value, valueTwo, token: 'aehaueha' })('status', 'message', { 'messageTwo': ['messageTitle', 'messageBody', { 'messageAlt': 'test'}, { 'messageAtt': ['att1', 'att2'] }] })
  console.log(query)
	output.innerText = query
}

function buildMutation() {
	const value = [
		input.value,
		inputTwo.value,
		false
	]
  const mutation = Builder.mutation('createUser')({ value: [ 'value', '123', 'John Doe' ] })('status', 'message', { 'messageTwo': ['messageTitle', 'messageBody', { 'messageAlt': 'test'}, { 'messageAtt': ['att1', 'att2'] }] })
  console.log(mutation)
	output.innerText = mutation
}