import React from 'react';

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
			{ 
				name: 'Panelist Three', 
				role: 'Panel Member', 
				img: 'https://randomuser.me/api/portraits/men/13.jpg', 
				linkedin: 'https://www.linkedin.com/in/panelist-three' 
			},
		],
	},
	


	
	{
		id: 'tech-team',
		title: 'Tech Team',
		members: [
		{ 
			name: 'Asdfksd',
			role: 'LEAD',
			img: '/images/avi.png',
			linkedin: 'http://www.linkedin.com/in/avinashgautam007'
		},
		{ 
			name: 'Priya Sharma',
			role: 'Frontend Dev',
			img: 'https://randomuser.me/api/portraits/women/44.jpg',
			linkedin: 'https://www.linkedin.com/in/priya-sharma'
		},
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
			name: 'Riya Kapoor', 
			role: 'Social Lead', 
			img: 'https://randomuser.me/api/portraits/women/60.jpg', 
			linkedin: 'https://www.linkedin.com/in/riya-kapoor' 
		},
		{ 
			name: 'Ankit Yadav', 
			role: 'Content Strategist', 
			img: 'https://randomuser.me/api/portraits/men/24.jpg', 
			linkedin: 'https://www.linkedin.com/in/ankit-yadav' 
		},
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
			name: 'Meera Nair', 
			role: 'Video Editor', 
			img: 'https://randomuser.me/api/portraits/women/13.jpg', 
			linkedin: 'https://www.linkedin.com/in/meera-nair' 
		},
		{ 
			name: 'Dev Patel', 
			role: 'Post Production', 
			img: 'https://randomuser.me/api/portraits/men/18.jpg', 
			linkedin: 'https://www.linkedin.com/in/dev-patel' 
		},

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
			{ name: 'Sarthak Jain', role: 'LinkedIn Manager', img: 'https://randomuser.me/api/portraits/men/7.jpg', linkedin: 'https://www.linkedin.com/in/sarthak-jain' },
			{ name: 'Pooja Sinha', role: 'Content Writer', img: 'https://randomuser.me/api/portraits/women/71.jpg', linkedin: 'https://www.linkedin.com/in/pooja-sinha' },
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

const TeamMembers = () => {
	return (
		<section id="team" className="py-16 scroll-mt-[90px]">
			<div className="max-w-[1100px] mx-auto px-4">
				<h2 className="text-center text-[3rem] font-extrabold mb-4 text-white">Our Teams</h2>
				<p className="text-center text-[color:var(--text-secondary)] mb-5">Meet the people powering VITERA across different domains.</p>

				{/* navigation  */}
				<div className="w-full flex rounded-[1rem] flex-wrap gap-3 justify-center p-1">
					{teams.map((t) => (
						<a
							key={t.id}
							href={`#${t.id}`}
							className="bg-[rgba(255,255,255,0.06)] border border-white !text-white visited:!text-white active:!text-white py-[0.55rem] px-[1.1rem] rounded-full text-[1rem] transition hover:bg-[var(--primary)] hover:!text-white hover:border-white hover:-translate-y-[1px] cursor-pointer"
						>
							{t.title}
						</a>
					))}
				</div>

				{/* Teams */}
				{teams.map((team) => (
					<div key={team.id} id={team.id} className="my-[2.2rem]  scroll-mt-[100px]">
						<h3 className="text-[1.6rem] gap-5 mx-5 font-extrabold mb-[0.9rem] text-white">{team.title}</h3>
						<div className="grid grid-cols-4 gap-[2.5rem] max-[992px]:grid-cols-2 max-[992px]:gap-8 max-[640px]:grid-cols-1">
							{team.members.map((m, idx) => (
								<a
									key={idx}
									href={m.linkedin || '#'}
									target={m.linkedin ? '_blank' : undefined}
									rel={m.linkedin ? 'noopener noreferrer' : undefined}
									className="member-card block rounded-[18px] pt-[1.8rem] px-[1.2rem] pb-[1.2rem] text-center transform-gpu shadow-[0_4px_18px_rgba(255,69,0,0.08)] hover:shadow-[0_8px_32px_rgba(255,140,0,0.18)]"
									aria-label={`Open ${m.name}'s LinkedIn profile`}
								>
									<div className="w-[90px] h-[90px] rounded-full overflow-hidden mx-auto mb-[1.2rem] border-[3px] border-[var(--primary)] shadow-[0_0_0_6px_rgba(255,69,0,0.08)] bg-[#232323]">
										<img src={m.img} alt={m.name} className="w-full h-full object-cover" />
									</div>
									<p className="font-bold text-[1.25rem] mt-[0.2rem] mb-[0.1rem] text-white">{m.name}</p>
									<p className="text-[color:var(--secondary)] font-medium text-[1rem] m-0">{m.role}</p>
								</a>
							))}
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default TeamMembers;
