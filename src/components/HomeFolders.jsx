import Folder from './Folder.jsx';
import './HomeFolders.css';

const folderLinks = [
	{
		href: '/blog',
		title: 'Technical Blog',
		description: 'Research notes, AI engineering, DevOps pipelines, and production lessons.',
		papers: ['AI notes', 'DevOps', 'Systems'],
	},
	{
		href: '/portfolio',
		title: 'Portfolio',
		description: 'Production-grade projects, technical context, and product experiments.',
		papers: ['Products', 'Infra', 'Demos'],
	},
	{
		href: '/case-studies',
		title: 'Case Studies',
		description: 'Evidence-backed project pages for PromptTriage and upcoming studies.',
		papers: ['Evidence', 'Diagrams', 'Results'],
	},
	{
		href: 'https://github.com/ker102',
		title: 'Open Source',
		description: 'Developer tooling, public repositories, and shared automation work.',
		papers: ['Repos', 'Tools', 'OSS'],
		external: true,
	},
];

export default function HomeFolders() {
	return (
		<nav className="home-folders" aria-label="Primary sections">
			{folderLinks.map((link) => (
				<a
					className="home-folder-link"
					href={link.href}
					key={link.href}
					rel={link.external ? 'noreferrer' : undefined}
					target={link.external ? '_blank' : undefined}
				>
					<div className="home-folder-stage" aria-hidden="true">
						<Folder
							className="home-folder-asset"
							color="#b5b2ab"
							size={1.55}
							label={link.title}
							items={link.papers.map((paper) => (
								<span className="folder-paper-label" key={paper}>
									{paper}
								</span>
							))}
						/>
					</div>
					<div className="home-folder-copy">
						<h2>{link.title}</h2>
						<p>{link.description}</p>
					</div>
				</a>
			))}
		</nav>
	);
}
