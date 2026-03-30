import React, { useState } from 'react';
import './TeamMembers.css';

const teams = [
	{
		id: 'panel-team',
		title: 'Panel Team',
		members: [
			{ 
				name: 'Prashant Kaundal', 
				role: 'President', 
				img: '/images/Our Team/Panel/prashant.webp', 
				linkedin: 'https://wa.me/+919317104238' 
			},
			{ 
				name: 'Anoushka Bakshi', 
				role: ' Vice-President', 
				img: '/images/Our Team/Panel/anoushka.jpg', 
				linkedin: '#' 
			},
			{
				name: 'Amishi Arora',
				role: 'Chairperson',
				img: '/images/Our Team/Panel/amishi.jpg',
				linkedin:'https://www.instagram.com/amishi_._?igsh=aGZia2M4eG1rY3Fy'
			},
			{
			name: 'Deeksha Bhojwani',
			role: 'General Secretary',
			img: '/images/Our Team/Panel/deeksha.jpg',
			linkedin: 'https://www.linkedin.com/in/deekshabhojwani'
		  },
      { 
			name: 'Shamim Uz Zaman', 
			role: 'Joint Secretary', 
			img: '/images/Our Team/Panel/shamim.jpeg', 
			linkedin: 'https://www.linkedin.com/in/shamim-uz-zaman-88788531a' 
		  },
      { 
			name: 'Vanshika Solanki', 
			role: 'Finance Head', 
			img: '/images/Our Team/Panel/vanshika.jpg', 
			linkedin: 'https://www.linkedin.com/in/vanshika-solanki-318592336' 
		  },
			
		],
	},
	
	
	{
		id: 'tech-team',
		title: 'Technical Team',
		members: [
		{ 
			name: 'Saksham Jaiswal',
			role: 'Technical Lead',
			img: '/images/Our Team/Tech Team/saksham.png',
			linkedin: 'https://www.linkedin.com/in/saksham-jaiswal-57022626b/'
		},
		{ 
			name: 'Amogh Patel',
			role: 'Technical Co-Lead',
			img: '/images/Our Team/Tech Team/amogh.jpg',
			linkedin: 'https://www.linkedin.com/in/amogh-patel-42a261307'
		},
		{
			name: 'Anvesha Srivastava',
			role: 'Core Member',
			img: '/images/Our Team/Tech Team/anvesha.jpg',
			linkedin: 'https://www.linkedin.com/in/anveshasrivastava'
		},
		],
	},
	{
		id: 'pr-outreach-team',
		title: 'PR & Outreach Team',
		members: [
    {
			name: 'Shreyash Shadhian',
			role: 'Co-Lead',
			img: '/images/Our Team/PR & Outreach Team/shreyash.jpg',
			linkedin: 'https://www.linkedin.com/in/shreyash-shadhian-09a263328/'
		},
		{ 
			name: 'Ankshit Dey', 
			role: 'Core Member', 
			img: '/images/Our Team/PR & Outreach Team/ankshit.jpg', 
			linkedin: 'https://www.linkedin.com/in/ankshit-dey-074946329' 
		},
		{
			name: 'Navya Trisha Singh',
			role: 'Core Member',
			img: '/images/Our Team/PR & Outreach Team/trisha.jpg',
			linkedin: 'https://www.linkedin.com/in/navya-trisha-singh-23a77a32a'
		},
		{
			name: 'Vethra M',
			role: 'Core Member',
			img: '/images/Our Team/PR & Outreach Team/vethra.jpg',
			linkedin: 'https://www.linkedin.com/in/vethra-m-695514383'
		},
		{
			name: 'GAURI NANDANA M',
			role: 'Core Member',
			img: '/images/Our Team/PR & Outreach Team/gauri.png',
			linkedin: 'https://www.linkedin.com/in/gauri-nandana-m-463b6b378'
		},
		{
			name: 'Riddhi Garg',
			role: 'Core Member',
			img: '/images/Our Team/PR & Outreach Team/riddhi.jpg',
			linkedin: 'https://www.linkedin.com/in/riddhi-garg-997834257'
		},
		{
			name: 'Muskan Bisen',
			role: 'Core Member',
			img: '/images/Our Team/PR & Outreach Team/muskan.jpg',
			linkedin: 'https://www.linkedin.com/in/muskan-bisen-572b0733a'
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
			img: '/images/Our Team/Photography Team/hammad.jpg', 
			linkedin: 'https://www.linkedin.com/in/hammad-khan-47864a28a' 
		},
		{ 
			name: 'Janhavi Vinaykumar Raut ', 
			role: 'Co-Lead', 
			img: '/images/Our Team/Photography Team/janhvi.jpg', 
			linkedin: 'https://www.linkedin.com/in/janhavi-raut-1a3859340' 
		},
		
		{
			name: 'Rachit Rushil Paul',
			role: 'Core Member',
			img: '/images/Our Team/Photography Team/rachit.jpeg',
			linkedin: 'https://in.linkedin.com/in/rachit-paul-420723333'
		},
		{
			name: 'Md Jahiruddin Ahmed',
			role: 'Editor',
			img: '/images/Our Team/Photography Team/jahiruddin.jpg',
			linkedin: 'https://www.linkedin.com/in/md-jahiruddin-ahmed-14387b3a1'
		},
		],
	},
	{
		id: 'event-team',
		title: 'Event Team',
		members: [
    {
			name: 'Mekhla Singh',
			role: 'Lead',
			img: '/images/Our Team/Event Mgmt Team/mekhla.jpg',
			linkedin: 'https://www.linkedin.com/in/mekhla-singh-621426277/'
		},
    {
			name: 'P Laxmi Srivastava ',
			role: 'Co-Lead',
			img: '/images/Our Team/Event Mgmt Team/laxmi.png',
			linkedin: 'https://www.linkedin.com/in/plaxmi-srivastava-987704379'
		},
		{ 
			name: 'Akriti Kumari', 
			role: 'Core Member', 
			img: '/images/Our Team/Event Mgmt Team/akriti.jpg', 
			linkedin: 'https://www.linkedin.com/in/akriti-kumari-b54950324/' 
		},
		{ 
			name: 'Shrishty Priya ', 
			role: 'Core Member', 
			img: '/images/Our Team/Event Mgmt Team/shristhy.jpg', 
			linkedin: 'https://www.linkedin.com/in/shrishty-priya-86943b369/' 
		},
		{
			name: 'Tanisha Bariar',
			role: 'Core member',
			img: '/images/Our Team/Event Mgmt Team/tanisha.jpg',
			linkedin: '#'
		},
		{
			name: 'SWAGATIKA PRIYADARSHINI SAHOO',
			role: 'Core Member',
			img: '/images/Our Team/Event Mgmt Team/swagatika.jpg',
			linkedin: 'https://www.linkedin.com/in/swagatika-priyadarshini-sahoo-412a1237a'
		},
		{
			name: 'Pranshu Pedgaonkar',
			role: 'Core Member',
			img: '/images/Our Team/Event Mgmt Team/pranshu.jpg',
			linkedin: 'https://www.linkedin.com/in/pranshu-pedgaonkar-55156b37a'
		},
		{
			name: 'AASHUTOSH PARIHAR ',
			role: 'Core Member',
			img: '/images/Our Team/Event Mgmt Team/aashutosh.jpg',
			linkedin: 'https://www.linkedin.com/in/aashutosh-parihar-888a7730a'
		},
		{
			name: 'Adil Sukumar',
			role: 'Core Member',
			img: '/images/Our Team/Event Mgmt Team/adil.jpg',
			linkedin: 'www.linkedin.com/in/adilsukumar'
		}
		],
	},
	{
		id: 'design-team',
		title: 'Design Team',
		members: [
		{ 
			name: 'Bithol Satapathy', 
			role: 'Lead', 
			img: '/images/Our Team/Design Team/bithol.png', 
			linkedin: 'https://www.linkedin.com/in/bithol-satapathy-3aaa99321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
    {
			name: 'Bhosale Veerashree Prashantrao ',
			role: 'Co-Lead',
			img: '/images/Our Team/Design Team/bhosale.jpg',
			linkedin: 'https://www.linkedin.com/in/veerashri-bhosale-34581a324'
		},
		{ 
			name: 'Sehaj Jain ', 
			role: 'Core Member', 
			img: '/images/Our Team/Design Team/sahej.jpg', 
			linkedin: 'https://www.linkedin.com/in/sehaj-jain-66a183310?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		{
			name: 'Anisha Garg',
			role: 'Core Member',
			img: '/images/Our Team/Design Team/anisha.jpg',
			linkedin: 'https://www.linkedin.com/in/anisha-garg-b90918349'
		},
		{
			name: 'Vanya Singhal',
			role: 'Core Member',
			img: '/images/Our Team/Design Team/vanya.jpg',
			linkedin: 'https://www.linkedin.com/in/vanya-singhal-bb43a2331'
		},
		],
	},
	{
		id: 'social-media-team',
		title: 'Social Media Team',
		members: [
		{
			name: 'Rabhya Grover',
			role: 'Lead',
			img: '/images/Our Team/Social Media/rabhya.jpeg',
			linkedin: 'https://www.linkedin.com/in/rabhya-grover-9a552833a'
		},
		{
			name: 'Archita Shukla ',
			role: 'Core Member',
			img: '/images/Our Team/Social Media/archita.jpg',
			linkedin: 'https://www.linkedin.com/in/archita-shukla-a6727230a'
		},
		],
	},
	{
			id: 'content-team',
			title: 'Content Team',
			members: [
				{ 
					name: 'Rudra Narayan Mishra ', 
					role: 'Lead', 
					img: '/images/Our Team/Content Team/rudra.jpg', 
					linkedin: 'https://www.linkedin.com/in/rudra-narayan-mishra-b9a727327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
				},
        {
					name: 'Shreya Sahu ',
					role: 'Co-Lead',
					img: '/images/Our Team/Content Team/shreya.jpg',
					linkedin: 'https://www.linkedin.com/in/shreya-sahu-a247b0395'
				},
				// i need to add images here...
				{
					name: 'Riya Shukla',
					role: 'Core Member',
					img: '/images/Our Team/Content Team/riya.jpg',
					linkedin: 'https://www.linkedin.com/in/riya-shukla-277495324'
				},
				{
					name : 'Shaurya Anurag',
					role: 'Core Member',
					img: '/images/Our Team/Content Team/shaurya.jpeg',
					linkedin: 'www.linkedin.com/in/shauryaanurag'
				},
				{
					name: 'Shilpi Kumari',
					role: 'Core Member',
					img: '/images/Our Team/Content Team/shilpi.jpg',
					linkedin: 'https://www.linkedin.com/in/shilpi-kumari-334a511b8'
				},
				{
					name: 'Soumya Chouhan',
					role: 'Core Member',
					img: '/images/Our Team/Content Team/soumya.jpg',
					linkedin: '#'
				},
				{
					name: 'Tanisha Sharma ',
					role: 'Core Member',
					img: '/images/Our Team/Content Team/tanisha.jpg',
					linkedin: 'https://www.linkedin.com/in/tanisha-sharma-a50989324'
				},
				{
					name: 'Divyanka ',
					role: 'Core Member',
					img: '/images/Our Team/Content Team/divyanka.jpg',
					linkedin: '#'
				},
			],
	},
];

const TeamMembers = () => {
  const [selectedTeam, setSelectedTeam] = useState('panel-team');

  return (
    <section id="team" className="team-members-section py-16 scroll-mt-[90px]">
      <div className="container">
        <h2 className="team-members-title text-center text-[3rem] font-extrabold mb-8 text-white">Our Teams</h2>
        <p className="team-members-subtitle text-center text-[color:var(--text-secondary)] mb-12 max-w-[700px] mx-auto">
          Meet the passionate individuals driving VITERA's mission forward across different domains
        </p>

        {/* Team Navigation */}
        <div className="team-nav w-full flex justify-center">
          {teams.map((t) => (
            <button
              key={t.id}
              className={`team-nav-btn ${selectedTeam === t.id ? 'active' : ''}`}
              onClick={() => setSelectedTeam(t.id)}
            >
              {t.title}
            </button>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="team-members-container w-full">
          {teams.map((team) => (
            <div 
              key={team.id} 
              className={`team-section ${selectedTeam === team.id ? 'active' : ''}`}
            >
              <div className="members-grid">
                {team.members.map((member, idx) => (
                  <a
                    key={idx}
                    href={member.linkedin || '#'}
                    target={member.linkedin && member.linkedin !== '#' ? '_blank' : undefined}
                    rel={member.linkedin && member.linkedin !== '#' ? 'noopener noreferrer' : undefined}
                    className="member-card"
                  >
                    <div className="member-image-wrapper">
                      <img 
                        src={member.img} 
                        alt={member.name} 
                        className="member-image"
                        loading="lazy"
                      />
                      <div className="member-overlay">
                        <span className="view-profile">View Profile</span>
                      </div>
                    </div>
                    <div className="member-info">
                      <h3 className="member-name">{member.name}</h3>
                      <p className="member-role">{member.role}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;