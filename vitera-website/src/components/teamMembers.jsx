import React, { useEffect, useRef, useState } from 'react';
import { Linkedin } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const teams = [
	{
		id: 'panel-team',
		title: 'Panel Team',
		members: [
			{ 
				name: 'Lakshya Pandey ', 
				role: 'Founder & President ', 
				img: '/images/Panel/lakshya.jpg', 
				linkedin: 'https://www.linkedin.com/in/lakshya-pandey-31456628a/' 
			},
			{ 
				name: 'Spandan Agrawal', 
				role: 'Founder & Vice-President', 
				img: '/images/Panel/spandan.jpg', 
				linkedin: 'https://www.linkedin.com/in/s-74917028a/' 
			},
		],
	},
	


	{
		id: 'tech-team',
		title: 'Tech Team',
		members: [
		
		
		{ 
			name: 'Avinash Kumar',
			role: 'Core Member',
			img: '/images/Tech Team/avinash.jpg',
			linkedin: 'http://www.linkedin.com/in/avinashgautam007'
		},

		{ 
			name: 'Bhaskar Ojha',
			role: 'Core Member',
			img: '/images/Tech Team/bhaskar.jpg',
			linkedin: 'https://www.linkedin.com/in/itsbhaskarojha/'
		},
		{ 
			name: 'Saksham Jaiswal',
			role: 'Core Member',
			img: '/images/Tech Team/saksham.png',
			linkedin: 'https://www.linkedin.com/in/saksham-jaiswal-57022626b/'
		}
		],
	},
	{
		id: 'pr-outreach-team',
		title: 'PR & Outreach Team',
		members: [
		{ 
			name: 'Arya Sharma ', 
			role: 'Lead', 
			img: '/images/PR & Outreach Team/arya sharma.jpg', 
			linkedin: 'https://www.linkedin.com/in/arya-sharma-460715340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		{ 
			name: 'Vikram Singh', 
			role: 'Outreach Coordinator', 
			img: 'https://randomuser.me/api/portraits/men/77.jpg', 
			linkedin: 'https://www.linkedin.com/in/vikram-singh' 
		},
		],
	},
	{
		id: 'photography-team',
		title: 'Photography Team',
		members: [
		{ 
			name: 'Mohd Hammad', 
			role: 'Lead', 
			img: '/images/Photography Team/hammad.jpg', 
			linkedin: 'https://www.linkedin.com/in/hammad-khan-47864a28a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		{ 
			name: 'Janhavi Vinaykumar Raut ', 
			role: 'Co-Lead', 
			img: '/images/Photography Team/janhvi.jpg', 
			linkedin: 'https://www.linkedin.com/in/janhavi-raut-1a3859340?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		{ 
			name: 'Shamim Uz Zaman', 
			role: 'Core Member', 
			img: '/images/Photography Team/shamim.jpeg', 
			linkedin: 'https://www.linkedin.com/in/shamim-uz-zaman-88788531a' 
		},
		{ 
			name: 'Pradeep Vishnoi', 
			role: 'Editor', 
			img: '/images/Photography Team/pradeep.jpg', 
			linkedin: 'https://www.linkedin.com/in/pradeep-vishnoi-04169a342' 
		},
		],
	},
	{
		id: 'event-team',
		title: 'Event Team',
		members: [
		{ 
			name: 'Bidhi Sarma', 
			role: 'Lead', 
			img: '/images/Event Mgmt Team/bidhi.jpg', 
			linkedin: 'https://www.linkedin.com/in/bidhi-sarma-91807028a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		{ 
			name: 'Mahijith Chowdhury', 
			role: 'Co-Lead', 
			img: '/images/Event Mgmt Team/mahijith.jpg', 
			linkedin: 'https://www.linkedin.com/in/mahijith-chowdhury-7b88b4321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		{ 
			name: 'AKRITI KUMARI', 
			role: 'Core Member', 
			img: '/images/Event Mgmt Team/akriti.jpg', 
			linkedin: 'https://www.linkedin.com/in/akriti-kumari-b54950324/' 
		},
		{ 
			name: 'Shrishty priya ', 
			role: 'Core Member', 
			img: 'images/Event Mgmt Team/shristhy.jpg', 
			linkedin: 'https://www.linkedin.com/in/shrishty-priya-86943b369/' 
		},
		{ 
			name: 'vanshika solanki ', 
			role: 'Core Member', 
			img: 'images/Event Mgmt Team/vanshika.jpg', 
			linkedin: 'https://www.linkedin.com/in/vanshika-solanki-318592336?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		{ 
			name: 'Anjistha sharma ', 
			role: 'Core Member', 
			img: 'images/Event Mgmt Team/anjistha.heic', 
			linkedin: 'https://www.linkedin.com/in/anjistha-sharma-887930328?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		],
	},
	{
		id: 'design-team',
		title: 'Design Team',
		members: [
		{ 
			name: 'Saurav Pandey', 
			role: 'Lead', 
			img: '/images/Design Team/saurav.jpeg', 
			linkedin: 'https://www.linkedin.com/in/saurav-pandey-00100rav' 
		},
		{ 
			name: 'Aribah Armin ', 
			role: 'Co-Lead', 
			img: '/images/Design Team/aribah.webp', 
			linkedin: 'https://www.linkedin.com/in/aribah-armin-2a5715282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		{ 
			name: 'Bithol Satapathy', 
			role: 'Core Member', 
			img: '/images/Design Team/bithol.png', 
			linkedin: 'https://www.linkedin.com/in/bithol-satapathy-3aaa99321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		{ 
			name: 'Sehaj Jain ', 
			role: 'Core Member', 
			img: '/images/Design Team/sahej.jpg', 
			linkedin: 'https://www.linkedin.com/in/sehaj-jain-66a183310?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		{ 
			name: 'Sujoy Pal', 
			role: 'Core Member', 
			img: '/images/Design Team/sujoy.jpg', 
			linkedin: 'www.linkedin.com/in/sujoy-pal-36725a378' 
		},
		],
	},
	{
		id: 'social-media-team',
		title: 'Social Media Team',
		members: [
		
		
		{ 
			name: 'Vedanti Gajbhiye ', 
			role: 'Core Member', 
			img: '/images/Social Media/vedanti.JPG', 
			linkedin: 'https://www.linkedin.com/in/gajbhiyevedanti' 
		},
		{ 
			name: 'Avni Agrawal', 
			role: 'Core Member', 
			img: '/images/Social Media/avni.jpeg', 
			linkedin: 'http://linkedin.com/in/avni-agrawal-abb17b311' 
		},
		],
	},
	{
		id: 'editing-team',
		title: 'Editing Team',
		members: [
		
		

		{ 
			name: 'Manas Gursahani', 
			role: 'Core Member', 
			img: '/images/Editing Team/MANAS GURSAHANI.jpeg', 
			linkedin: 'https://www.linkedin.com/in/manas-gursahani-4b5aa3332?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app' 
		},

		{ 
			name: 'Sahil Singh ', 
			role: 'Member', 
			img: '/images/Editing Team/sahil.jpg', 
			linkedin: '' 
		},






		],
	},
	{
			id: 'linkedin-team',
			title: 'LinkedIn Team',
			members: [
			{
				 name: 'Sarthak Jain', 
				 role: 'LinkedIn Manager', 
				 img: 'https://randomuser.me/api/portraits/men/7.jpg', 
				 linkedin: 'https://www.linkedin.com/in/sarthak-jain' 
				},
			
			],
	},
	{
			id: 'content-team',
			title: 'Content Team',
			members: [
				{ 
					name: 'Anoushka Bakshi ', 
					role: 'Lead', 
					img: 'images/Content Team/anoushka.jpg', 
					linkedin: '' 
				},
				{ 
					name: 'Yashika Agrawal ', 
					role: 'Co-Lead', 
					img: '/images/Content Team/yashika.jpg', 
					linkedin: 'https://www.linkedin.com/in/yashika-agrawal-132491281' 
				},
				{ 
					name: 'Navya Srivastava', 
					role: 'Core Member', 
					img: '/images/Content Team/navya.jpg', 
					linkedin: 'https://www.linkedin.com/in/navya-srivastava-53350528a?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BH3sTmUrrTKOoL3osw9Jc4A%3D%3D' 
				},
				{ 
					name: 'Rudra Narayan Mishra ', 
					role: 'Core Member', 
					img: '/images/Content Team/rudra.jpg', 
					linkedin: 'https://www.linkedin.com/in/rudra-narayan-mishra-b9a727327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
				},
			],
	},
];

// Fallback quotes about social responsibility and service
const defaultQuotes = [
	{ text: 'The greatest threat to our planet is the belief that someone else will save it.', author: 'Robert Swan' },
	{ text: 'We do not inherit the Earth from our ancestors; we borrow it from our children.', author: 'Native American Proverb' },
	{ text: 'The best way to find yourself is to lose yourself in the service of others.', author: 'Mahatma Gandhi' },
	{ text: 'Life’s most persistent and urgent question is: “What are you doing for others?”', author: 'Martin Luther King Jr.' },
	{ text: 'No act of kindness, no matter how small, is ever wasted.', author: 'Aesop' },
	{ text: 'Be the change that you wish to see in the world.', author: 'Mahatma Gandhi' },
	{ text: 'It is not enough to be compassionate—you must act.', author: 'Dalai Lama' },
	{ text: 'We rise by lifting others.', author: 'Robert Ingersoll' },
	{ text: 'What you do makes a difference, and you have to decide what kind of difference you want to make.', author: 'Jane Goodall' },
	{ text: 'The purpose of human life is to serve, and to show compassion and the will to help others.', author: 'Albert Schweitzer' },
];

const TeamMembers = () => {
	// Dropdown open state and selected team id
	const [isOpen, setIsOpen] = useState(false);
	const [selectedTeamId, setSelectedTeamId] = useState(null);
	const menuRef = useRef(null);

	// Close on outside click or on Escape
	useEffect(() => {
		const onClickAway = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		};
		const onEsc = (e) => {
			if (e.key === 'Escape') setIsOpen(false);
		};
		document.addEventListener('mousedown', onClickAway);
		document.addEventListener('keydown', onEsc);
		return () => {
			document.removeEventListener('mousedown', onClickAway);
			document.removeEventListener('keydown', onEsc);
		};
	}, []);

	const selectedTeam = teams.find((t) => t.id === selectedTeamId) || null;

	// Quotes state: attempt to fetch, fallback to defaults
	const [quotes, setQuotes] = useState(defaultQuotes);
	const [quoteIndex, setQuoteIndex] = useState(0);

	useEffect(() => {
		let ignore = false;
		const controller = new AbortController();
		// Build a large, unique pool using multiple sources; fallback gracefully
		(async () => {
			const keywords = /(responsib|responsibil|societ|community|serve|service|help|care|give|giving|kind|kindness|compassion|human|humanity|change|world|earth|planet|environment|climate|duty|justice|equality|inclusion|diversity|future|children)/i;
			const mapFiltered = new Map(); // filtered unique
			const mapAll = new Map(); // all unique (fallback)

			const addAll = (arr) => {
				for (const q of arr || []) {
					if (!q?.text) continue;
					const item = { text: q.text, author: q.author || 'Unknown' };
					mapAll.set(item.text, item);
					if (keywords.test(item.text)) mapFiltered.set(item.text, item);
				}
			};

			try {
				// 1) Quotable random in batches (reduces repetition)
				const tags = [
					'inspirational', 'wisdom', 'life', 'leadership', 'success', 'learning', 'friendship', 'happiness', 'courage', 'hope', 'famous-quotes'
				].join('|');
				const batchSize = 30;
				const maxBatches = 8;
				for (let i = 0; i < maxBatches; i++) {
					const url = `https://api.quotable.io/quotes/random?limit=${batchSize}&tags=${encodeURIComponent(tags)}&t=${Date.now()+i}`;
					const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
					if (!res.ok) break;
					const data = await res.json();
					if (ignore) return;
					const list = (Array.isArray(data) ? data : []).map((d) => ({ text: d.content, author: d.author || 'Unknown' }));
					addAll(list);
					if (mapAll.size >= 180) break; // stop early if we have enough
				}
			} catch (_) { /* ignore */ }

			try {
				// 2) Fallback/augment with Type.fit (~1600 quotes)
				if (mapAll.size < 120) {
					const res = await fetch('https://type.fit/api/quotes', { signal: controller.signal, cache: 'no-store' });
					if (res.ok) {
						const data = await res.json();
						if (ignore) return;
						const list = (Array.isArray(data) ? data : []).slice(0, 1000).map((d) => ({ text: d.text, author: d.author || 'Unknown' }));
						addAll(list);
					}
				}
			} catch (_) { /* ignore */ }

			try {
				// 3) As a last resort, page Quotable /quotes
				if (mapAll.size < 80) {
					for (let page = 1; page <= 3; page++) {
						const url = `https://api.quotable.io/quotes?limit=50&page=${page}&tags=inspirational|wisdom|famous-quotes`;
						const res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
						if (!res.ok) break;
						const data = await res.json();
						if (ignore) return;
						const list = (data?.results || []).map((d) => ({ text: d.content, author: d.author || 'Unknown' }));
						addAll(list);
						if (mapAll.size >= 120) break;
					}
				}
			} catch (_) { /* ignore */ }

			if (ignore) return;
			const uniqueFiltered = Array.from(mapFiltered.values());
			const uniqueAll = Array.from(mapAll.values());
			const chosen = uniqueFiltered.length >= 15 ? uniqueFiltered : uniqueAll; // relax filter if too few
			if (chosen.length > 0) {
				// Shuffle
				for (let i = chosen.length - 1; i > 0; i--) {
					const j = Math.floor(Math.random() * (i + 1));
					[chosen[i], chosen[j]] = [chosen[j], chosen[i]];
				}
				setQuotes(chosen.slice(0, 200));
			}
		})();
		return () => {
			ignore = true;
			controller.abort();
		};
	}, []);

	// Rotate quote every 10 seconds
	useEffect(() => {
		if (!quotes?.length) return;
		const id = setInterval(() => {
			setQuoteIndex((i) => (i + 1) % quotes.length);
		}, 10000);
		return () => clearInterval(id);
	}, [quotes]);

	// normalize image src: keep http(s) as-is, ensure leading slash for local paths
	const normalizeSrc = (p) => {
		if (!p) return '';
		if (/^https?:\/\//i.test(p)) return p;
		return p.startsWith('/') ? p : `/${p}`;
	};

	return (
		<section id="team" className="team-page-bg py-16 scroll-mt-[90px]">
			<div className="max-w-[1100px] mx-auto px-4">
				<h2 className="text-center text-[3rem] font-extrabold mb-4 text-white">Our Teams</h2>
				<p className="text-center text-[color:var(--text-secondary)] mb-5">Meet the people powering VITERA across different domains.</p>

				{/* Team selector: click the button to open the team list */}
				<div className="relative flex justify-center" ref={menuRef}>
					<button
						type="button"
						onClick={() => setIsOpen((v) => !v)}
						className="inline-flex items-center gap-2 bg-[rgba(255,255,255,0.06)] border border-white text-white py-3 px-5 rounded-full text-[1rem] hover:bg-[var(--primary)] transition focus:outline-none focus:ring-2 focus:ring-white"
						aria-haspopup="listbox"
						aria-expanded={isOpen}
					>
						{selectedTeam ? selectedTeam.title : 'Select a Team'}
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
							<path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
						</svg>
					</button>

					{isOpen && (
						<ul
							role="listbox"
							className="absolute z-20 mt-2 max-h-[320px] w-[min(720px,92vw)] overflow-auto rounded-2xl border border-white/50 bg-[#0e0e0f] p-2 shadow-[0_18px_60px_rgba(0,0,0,0.6)] grid grid-cols-2 gap-2 max-[520px]:grid-cols-1"
							aria-label="Teams"
						>
							{teams.map((t) => (
								<li key={t.id} role="option" aria-selected={selectedTeamId === t.id}>
									<button
										className={`w-full text-left py-2.5 px-3 rounded-xl border transition ${
											selectedTeamId === t.id
												? 'bg-[var(--primary)] text-white border-white'
												: 'bg-[rgba(255,255,255,0.04)] text-white border-white hover:bg-[rgba(255,255,255,0.12)]'
										}`}
										onClick={() => {
											setSelectedTeamId(t.id);
											setIsOpen(false);
										}}
									>
										{t.title}
									</button>
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Selected team members or a rotating quote when none selected. */}
				{!selectedTeam && (
					<div className="my-[2.2rem]">
						<div className="max-w-[1000px] mx-auto text-center px-4">
							<span className="inline-block text-white/70 uppercase tracking-widest text-xs">Social Responsibility</span>
							<blockquote key={quoteIndex} className="mt-4 text-white text-3xl md:text-5xl font-extrabold leading-tight">
								“{quotes[quoteIndex]?.text}”
							</blockquote>
							<p className="mt-4 text-white/85 text-lg font-medium">— {quotes[quoteIndex]?.author}</p>
						</div>
					</div>
				)}

				{selectedTeam && (
					<div className="my-[2.2rem]">
						<div className="flex items-center justify-between gap-3 mb-[0.9rem] mx-1">
							<h3 className="text-[1.6rem] font-extrabold text-white">{selectedTeam.title}</h3>
							<button
								className="text-white/80 hover:text-white text-sm underline underline-offset-4"
								onClick={() => setSelectedTeamId(null)}
							>
								Clear selection
							</button>
						</div>

						{/* Carousel per member styled like the provided hero reference */}
						<div className="team-swiper mt-6 relative w-screen max-w-[100vw] left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
							<Swiper
								modules={[Navigation, Pagination]}
								navigation
								pagination={{ clickable: true }}
								loop={selectedTeam.members.length > 1}
								className="!pb-12 w-full"
							>
								{selectedTeam.members.map((m, idx) => (
									<SwiperSlide key={idx}>
										<div className="max-w-[1280px] mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
											{/* Left: name, role, linkedin */}
											<div className="px-2 md:px-6">
												<h4 className="text-white text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
													{m.name}
												</h4>
												<p className="mt-6 text-white text-2xl font-semibold">{m.role}</p>
												{m.linkedin && (
													<a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full border border-white px-6 py-3 text-white hover:bg-white/10 transition">
														<Linkedin size={20} />
														View LinkedIn
													</a>
												)}
											</div>

											{/* Right: large circular image mask */}
											<div className="relative flex justify-center lg:justify-end">
												<div className="hero-photo relative w-[78vw] max-w-[780px] aspect-square rounded-full overflow-hidden border border-white/15 bg-[rgba(255,255,255,0.05)]">
													<img src={normalizeSrc(m.img)} alt={m.name} className="h-full w-full object-cover" />
													{/* soft vignette */}
													<div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_70%_50%,transparent_40%,rgba(0,0,0,0.25)_100%)]" />
												</div>
											</div>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default TeamMembers;
