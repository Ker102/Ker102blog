import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const exists = (file) => fs.existsSync(path.join(root, file));

const checks = [
	{
		name: 'case studies route exists',
		pass: () => exists('src/pages/case-studies.astro'),
	},
	{
		name: 'case studies page follows required template sections',
		pass: () => {
			const page = read('src/pages/case-studies.astro');
			return [
				'Executive summary',
				'Problem',
				'Context and constraints',
				'Requirements',
				'Architecture',
				'Security model',
				'Deployment pipeline',
				'Operations',
				'Cost analysis',
				'Results',
				'Tradeoffs',
				'Failure modes and lessons learned',
				'What I would improve next',
				'Repository and demo links',
				'Interview explanation',
				'Resume bullets',
			].every((section) => page.includes(section));
		},
	},
	{
		name: 'case studies page has evidence statuses and mobile-first CSS',
		pass: () => {
			const page = read('src/pages/case-studies.astro');
			return [
				'Complete case study',
				'Source verified',
				'Case study in progress',
				'@media (min-width:',
				'grid-template-columns',
			].every((token) => page.includes(token));
		},
	},
	{
		name: 'shared header links to case studies',
		pass: () => read('src/components/Header.astro').includes('href="/case-studies"'),
	},
	{
		name: 'homepage links to case studies',
		pass: () => read('src/pages/index.astro').includes('href="/case-studies"'),
	},
	{
		name: 'mobile-first pass touched all page surfaces',
		pass: () => {
			const files = [
				'src/pages/index.astro',
				'src/pages/portfolio.astro',
				'src/pages/blog/index.astro',
				'src/layouts/BlogPost.astro',
				'src/components/Header.astro',
				'src/components/Footer.astro',
				'src/styles/global.css',
			];
			return files.every((file) => read(file).includes('@media'));
		},
	},
];

const failures = checks.filter((check) => {
	try {
		return !check.pass();
	} catch {
		return true;
	}
});

if (failures.length > 0) {
	console.error('Case studies verification failed:');
	for (const failure of failures) console.error(`- ${failure.name}`);
	process.exit(1);
}

console.log(`Case studies verification passed: ${checks.length}/${checks.length} checks`);
