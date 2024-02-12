import { useId } from 'react'

export default function SubjectRoute() {
	const completed = false
	return (
		<main>
			{completed ? (
				<>
					<h1>Quiz completed</h1>
					<p>You scored...</p>
					<p>{'score'} out of 10</p>
					<form>
						<button type="submit">Play Again</button>
					</form>
				</>
			) : (
				<>
					<h1>Question {'number'} of 10</h1>
					<p>{'question'}</p>
					{/* todo: timer */}
					<form>
						{['A', 'B', 'C', 'D'].map((answer, i) => {
							return <Answer key={i} name={answer} />
						})}
						<button type="submit">Submit answer</button>
					</form>
				</>
			)}
		</main>
	)
}

function Answer({ name }: { name: string }) {
	const id = useId()
	return (
		<div>
			<input type="radio" name="answer" value={name} id={id} />
			<label htmlFor={id}>{name}</label>
		</div>
	)
}
