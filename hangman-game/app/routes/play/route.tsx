import * as AlertDialog from '@radix-ui/react-alert-dialog'
import * as Dialog from '@radix-ui/react-dialog'
import { Form, Link } from 'react-router-dom'
import { Icon } from '#app/components/icon'
import * as Landmark from '#app/components/landmark'
import { Img } from '#app/components/picture'

export function Play() {
	return (
		<>
			<header>
				<nav>
					<Dialog.Root>
						<Dialog.Trigger>
							<Icon name="icon-menu" />
							Menu
						</Dialog.Trigger>
						<Dialog.Portal>
							{/* <Dialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" /> */}
							<Dialog.Content
								// className="data-[state=open]:animate-contentShow bg-white fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
								aria-describedby={undefined}
							>
								<Dialog.Title
								// className="text-mauve12 m-0 text-[17px] font-medium"
								>
									Paused
								</Dialog.Title>
								<ul>
									<li>
										<Dialog.Close>Continue</Dialog.Close>
									</li>
									<li>
										<Link to="/categories">New category</Link>
									</li>
									<li>
										<Link to="/">Quit game</Link>
									</li>
								</ul>
							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
				</nav>
				<h1>Countries</h1>
				<p>
					<span>You have 3 out of 8 lives left</span>
					<Img
						alt=""
						src="/assets/images/icon-heart.svg"
						width="54"
						height="50"
					/>
				</p>
			</header>
			<main>
				<Landmark.Root>
					<Landmark.Label>
						<h2>Secret words</h2>
					</Landmark.Label>
					<p>Uni</p>
					<p>Blank</p>
					<p>Blank</p>
					<p>d</p>
					<p>Space</p>
					<p>Blank</p>
					<p>in</p>
					<p>Blank</p>
					<p>do</p>
					<p>Blank</p>
				</Landmark.Root>
				<Landmark.Root>
					<Landmark.Label>
						<h2>Keyboard</h2>
					</Landmark.Label>
					<Form method="post">
						<fieldset>
							<legend>Pick a letter</legend>
							<ol role="list">
								{[
									'a',
									'b',
									'c',
									'd',
									'e',
									'f',
									'g',
									'h',
									'i',
									'j',
									'k',
									'l',
									'm',
									'n',
									'o',
									'p',
									'q',
									'r',
									's',
									't',
									'u',
									'v',
									'w',
									'x',
									'y',
									'z',
								].map((letter) => (
									<li key={letter}>
										<button name="letter" value={letter}>
											{letter}
										</button>
									</li>
								))}
							</ol>
						</fieldset>
					</Form>
				</Landmark.Root>
				<AlertDialog.Root open={false} onOpenChange={() => {}}>
					<AlertDialog.Portal>
						{/* <AlertDialog.Overlay className="bg-blackA6 data-[state=open]:animate-overlayShow fixed inset-0" /> */}
						<AlertDialog.Content
							// className="data-[state=open]:animate-contentShow bg-white fixed left-[50%] top-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
							aria-describedby={undefined}
						>
							<AlertDialog.Title
							// className="text-mauve12 m-0 text-[17px] font-medium"
							>
								You Win/You Lose
							</AlertDialog.Title>
							<ul>
								<li>
									<Form>
										<button>Play again!</button>
									</Form>
								</li>
								<li>
									<Link to="/categories">New category</Link>
								</li>
								<li>
									<Link to="/">Quit game</Link>
								</li>
							</ul>
						</AlertDialog.Content>
					</AlertDialog.Portal>
				</AlertDialog.Root>
			</main>
		</>
	)
}
