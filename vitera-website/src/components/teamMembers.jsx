import React, { useState } from 'react';

const teams = [
	{
		id: 'panel-team',
		title: 'Panel Team',
		members: [
			{ 
				name: 'Lakshya Pandey ', 
				role: 'Founder & President ', 
				img: '/images/Our Team/Panel/lakshya.webp', 
				linkedin: 'https://www.linkedin.com/in/lakshya-pandey-31456628a' 
			},
			{ 
				name: 'Spandan Agrawal', 
				role: 'Founder & Vice-President', 
				img: '/images/Our Team/Panel/spandan.jpg', 
				linkedin: 'https://www.linkedin.com/in/s-74917028a/' 
			},
			{ 
				name: 'Anoushka Bakshi ', 
				role: 'General Secretary', 
				img: 'images/Our Team/Panel/anoushka.jpg', 
				linkedin: '#' 
			},
			{
				name: 'Amishi Arora',
				role: 'Joint Secretary',
				img: '/images/Our Team/Panel/amishi.jpg',
				linkedin: 'https://www.instagram.com/amishi_._?igsh=aGZia2M4eG1rY3Fy'
			},
			{
				name: 'Prashant Kaundal',
				role: 'Chairperson',
				img: '/images/Our Team/Panel/prashant.webp',
				linkedin:'https://wa.me/+919317104238'
			}
		],
	},
	
	
	{
		id: 'tech-team',
		title: 'Technical Team',
		members: [
		{ 
			name: 'Taneesh Patel',
			role: 'Technical Lead',
			img: '/images/Our Team/Tech Team/taneesh.jpeg',
			linkedin: 'https://www.linkedin.com/in/taneesh-patel-53b83b26b/'
		},
		{ 
			name: 'Shravan Jain',
			role: 'Technical Co-Lead',
			img: '/images/Our Team/Tech Team/shravan.jpg',
			linkedin: 'https://www.linkedin.com/in/shravan-jain-630009280/'
		},
		{ 
			name: 'Avinash Kumar',
			role: 'Core Member',
			img: '/images/Our Team/Tech Team/avinash.jpg',
			linkedin: 'http://www.linkedin.com/in/avinashgautam007'
		},
		{ 
			name: 'Bhaskar Ojha',
			role: 'Core Member',
			img: '/images/Our Team/Tech Team/bhaskar.jpg',
			linkedin: 'https://www.linkedin.com/in/itsbhaskarojha/'
		},
		{ 
			name: 'Saksham Jaiswal',
			role: 'Core Member',
			img: '/images/Our Team/Tech Team/saksham.png',
			linkedin: 'https://www.linkedin.com/in/saksham-jaiswal-57022626b/'
		},
		{
			name: 'Akshay Kumar Mishra',
			role: 'Core Member',
			img: '/images/Our Team/Tech Team/akshay.jpg',
			linkedin: 'https://www.linkedin.com/in/akshay-kumar-mishra-320413246'
		},
		{
			name: 'Kapil Kumar Arya',
			role: 'Core Member',
			img: '/images/Our Team/Tech Team/kapil.jpg',
			linkedin: 'https://www.linkedin.com/in/kapil-kumar-arya-b0636528a'
		},
		{
			name: 'Amogh Patel',
			role: 'Core Member',
			img: '/images/Our Team/Tech Team/amogh.jpg',
			linkedin: 'https://www.linkedin.com/in/amogh-patel-42a261307'
		},
		{
			name: 'Aryan Agrawal',
			role: 'Core Member',
			img: '/images/Our Team/Tech Team/aryan.jpg',
			linkedin: 'https://www.linkedin.com/in/agrawalaryan547'
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
			name: 'Arya Sharma ', 
			role: 'Team Lead', 
			img: '/images/Our Team/PR & Outreach Team/arya sharma.jpg', 
			linkedin: 'https://www.linkedin.com/in/arya-sharma-460715340' 
		},
		{
			name: 'Deeksha Bhojwani',
			role: 'Co-Lead',
			img: '/images/Our Team/PR & Outreach Team/deeksha.jpg',
			linkedin: 'https://www.linkedin.com/in/deekshabhojwani'
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
			name: 'Aarya Kishor Jadhav',
			role: 'Core Member',
			img: '/images/Our Team/PR & Outreach Team/navya.jpg',
			linkedin: 'https://www.linkedin.com/in/aarya-jadhav-8089b434a',
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
			name: 'Shreyash Shadhian',
			role: 'Core Member',
			img: '/images/Our Team/PR & Outreach Team/shreyash.jpg',
			linkedin: 'https://www.linkedin.com/in/shreyash-shadhian-09a263328/'
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
			name: 'Shamim Uz Zaman', 
			role: 'Core Member', 
			img: '/images/Our Team/Photography Team/shamim.jpeg', 
			linkedin: 'https://www.linkedin.com/in/shamim-uz-zaman-88788531a' 
		},
		{ 
			name: 'Pradeep Vishnoi', 
			role: 'Editor', 
			img: '/images/Our Team/Photography Team/pradeep.jpg', 
			linkedin: 'https://www.linkedin.com/in/pradeep-vishnoi-04169a342' 
		},
		{ 
			name: 'Sahil Singh ', 
			role: 'Editor', 
			img: '/images/Our Team/Photography Team/sahil.jpg', 
			linkedin: '#' 
		},
		{
			name: 'Dharini Sharma',
			role: 'Core Member',
			img: '/images/Our Team/Photography Team/dharini.jpg',
			linkedin: 'https://www.linkedin.com/in/dharini-sharma-9a10ba308'
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
			name: 'Bidhi Sarma', 
			role: 'Lead', 
			img: '/images/Our Team/Event Mgmt Team/bidhi.jpg', 
			linkedin: 'https://www.linkedin.com/in/bidhi-sarma-91807028a' 
		},
		{ 
			name: 'Mahijith Chowdhury', 
			role: 'Co-Lead', 
			img: '/images/Our Team/Event Mgmt Team/mahijith.jpg', 
			linkedin: 'https://www.linkedin.com/in/mahijith-chowdhury-7b88b4321' 
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
			img: 'images/Our Team/Event Mgmt Team/shristhy.jpg', 
			linkedin: 'https://www.linkedin.com/in/shrishty-priya-86943b369/' 
		},
		{ 
			name: 'Vanshika Solanki', 
			role: 'Core Member', 
			img: 'images/Our Team/Event Mgmt Team/vanshika.jpg', 
			linkedin: 'https://www.linkedin.com/in/vanshika-solanki-318592336' 
		},
		{ 
			name: 'Anjistha sharma ', 
			role: 'Core Member', 
			img: 'images/Our Team/Event Mgmt Team/anjistha.jpg', 
			linkedin: 'https://www.linkedin.com/in/anjistha-sharma-887930328' 
		},
		{
			name: 'Aryaman Ghoshal',
			role: 'Core Member',
			img: 'images/Our Team/Event Mgmt Team/aryaman.jpg',
			linkedin: 'https://linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=aryaman-undefined-46b30132a'
		},
		{
			name: 'Mekhla Singh',
			role: 'Core Member',
			img: 'images/Our Team/Event Mgmt Team/mekhla.jpg',
			linkedin: 'https://www.linkedin.com/in/mekhla-singh-621426277/'
		},
		{
			name: 'Satyam Kumar Jha',
			role: 'Core Member',
			img: 'images/Our Team/Event Mgmt Team/satyam.png',
			linkedin: 'https://www.linkedin.com/in/satyamkumarjha21'
		},
		{
			name: 'Ayushman Dwivedi',
			role: 'Core Member',
			img: 'images/Our Team/Event Mgmt Team/ayushman.jpg',
			linkedin: 'https://www.linkedin.com/in/ayushman-dwivedi-1b492a260'
		},
		// i need to add images here..
		{
			name: 'Tanisha Bariar',
			role: 'Core member',
			img: 'images/Our Team/Event Mgmt Team/tanisha.jpg',
			linkedin: '#'
		},
		{
			name: 'Eshant Baranwal',
			role: 'Core Member',
			img: 'images/Our Team/Event Mgmt Team/eshant.jpg',
			linkedin: 'https://www.linkedin.com/in/eshant-baranwal-b7b635281'
		},
		{
			name: 'P Laxmi Srivastava ',
			role: 'Core Member',
			img: 'images/Our Team/Event Mgmt Team/laxmi.png',
			linkedin: 'https://www.linkedin.com/in/plaxmi-srivastava-987704379'
		},
		{
			name: 'SWAGATIKA PRIYADARSHINI SAHOO',
			role: 'Core Member',
			img: 'images/Our Team/Event Mgmt Team/swagatika.jpg',
			linkedin: 'https://www.linkedin.com/in/swagatika-priyadarshini-sahoo-412a1237a'
		},
		{
			name: 'Pranshu Pedgaonkar',
			role: 'Core Member',
			img: 'images/Our Team/Event Mgmt Team/pranshu.jpg',
			linkedin: 'https://www.linkedin.com/in/pranshu-pedgaonkar-55156b37a'
		},
		{
			name: 'AASHUTOSH PARIHAR ',
			role: 'Core Member',
			img: 'images/Our Team/Event Mgmt Team/aashutosh.jpg',
			linkedin: 'https://www.linkedin.com/in/aashutosh-parihar-888a7730a'
		},
		{
			name: 'Adil Sukumar',
			role: 'Core Member',
			img: 'images/Our Team/Event Mgmt Team/adil.jpg',
			linkedin: 'www.linkedin.com/in/adilsukumar'
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
			img: '/images/Our Team/Design Team/saurav.jpeg', 
			linkedin: 'https://www.linkedin.com/in/saurav-pandey-00100rav' 
		},
		{ 
			name: 'Aribah Armin ', 
			role: 'Co-Lead', 
			img: '/images/Our Team/Design Team/aribah.jpg', 
			linkedin: 'https://www.linkedin.com/in/aribah-armin-2a5715282?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		{ 
			name: 'Bithol Satapathy', 
			role: 'Core Member', 
			img: '/images/Our Team/Design Team/bithol.png', 
			linkedin: 'https://www.linkedin.com/in/bithol-satapathy-3aaa99321?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		{ 
			name: 'Sehaj Jain ', 
			role: 'Core Member', 
			img: '/images/Our Team/Design Team/sahej.jpg', 
			linkedin: 'https://www.linkedin.com/in/sehaj-jain-66a183310?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
		},
		{ 
			name: 'Sujoy Pal', 
			role: 'Core Member', 
			img: '/images/Our Team/Design Team/sujoy.jpg', 
			linkedin: 'www.linkedin.com/in/sujoy-pal-36725a378' 
		},
		{
			name: 'Anisha Garg',
			role: 'Core Member',
			img: '/images/Our Team/Design Team/anisha.jpg',
			linkedin: 'https://www.linkedin.com/in/anisha-garg-b90918349'
		},
		{
			name: 'Punyatirtha Sahoo',
			role: 'Core Member',
			img: '/images/Our Team/Design Team/punyatirtha.jpg',
			linkedin: 'https://www.linkedin.com/in/punyatirtha-sahoo-a72037365/'
		},
		{
			name: 'Bhosale Veerashree Prashantrao ',
			role: 'Core Member',
			img: '/images/Our Team/Design Team/bhosale.jpg',
			linkedin: 'https://www.linkedin.com/in/veerashri-bhosale-34581a324'
		},
		{
			name: 'Knishka Kumari',
			role: 'Core Member',
			img: '/images/Our Team/Design Team/knishka.jpg',
			linkedin: 'www.linkedin.com/in/knishka-kumari-77008b333'
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
			name: 'Rishika Snehal', 
			role: 'Lead', 
			img: '/images/Our Team/Social Media/rishika.jpg', 
			linkedin: 'https://linkedin.com/in/rishika-snehal' 
		},
		{
			name: 'Rabhya Grover',
			role: 'Co-Lead',
			img: '/images/Our Team/Social Media/rabhya.jpeg',
			linkedin: 'https://www.linkedin.com/in/rabhya-grover-9a552833a'
		},
		{ 
			name: 'Diksha Agrawal', 
			role: 'Core Member', 
			img: '/images/Our Team/Social Media/diksha.jpg', 
			linkedin: '#' 
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
					name: 'Yashika Agrawal ', 
					role: 'Co-Lead', 
					img: '/images/Our Team/Content Team/yashika.jpg', 
					linkedin: 'https://www.linkedin.com/in/yashika-agrawal-132491281' 
				},
				{ 
					name: 'Navya Srivastava', 
					role: 'Core Member', 
					img: '/images/Our Team/Content Team/navya.jpg', 
					linkedin: 'https://www.linkedin.com/in/navya-srivastava-53350528a' 
				},
				{ 
					name: 'Rudra Narayan Mishra ', 
					role: 'Core Member', 
					img: '/images/Our Team/Content Team/rudra.jpg', 
					linkedin: 'https://www.linkedin.com/in/rudra-narayan-mishra-b9a727327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' 
				},
				// i need to add images here...
				{
					name: 'Riya Shukla',
					role: 'Core Member',
					img: '/images/Our Team/Content Team/riya.jpg',
					linkedin: 'https://www.linkedin.com/in/riya-shukla-277495324'
				},
				{
					name: 'Shreya Sahu ',
					role: 'Core Member',
					img: '/images/Our Team/Content Team/shreya.jpg',
					linkedin: 'https://www.linkedin.com/in/shreya-sahu-a247b0395'
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
					img: '/images/Our Team/Content Team/divyanka.jpg'
				},
			],
	},
];

const TeamMembers = () => {
  const [selectedTeam, setSelectedTeam] = useState('panel-team');

  return (
    <section id="team" className="py-16 scroll-mt-[90px]">
      <div className="max-w-[1200px] mx-auto px-4">
        <h2 className="text-center text-[3rem] font-extrabold mb-8 text-white">Our Teams</h2>
        <p className="text-center text-[color:var(--text-secondary)] mb-12 max-w-[700px] mx-auto">
          Meet the passionate individuals driving VITERA's mission forward across different domains
        </p>

        {/* Team Navigation */}
        <div className="team-nav">
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
        <div className="team-members-container">
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
                    target={member.linkedin ? '_blank' : undefined}
                    rel={member.linkedin ? 'noopener noreferrer' : undefined}
                    className="member-card"
                  >
                    <div className="member-image-wrapper">
                      <img src={member.img} alt={member.name} className="member-image" />
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

      <style jsx>{`
        .team-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .team-nav-btn {
          padding: 0.7rem 1.5rem;
          border-radius: 30px;
          font-weight: 600;
          background: rgba(255,255,255,0.05);
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.3s ease;
        }

        .team-nav-btn:hover {
          background: rgba(255,92,0,0.15);
          border-color: var(--primary);
        }

        .team-nav-btn.active {
          background: var(--primary);
          border-color: var(--primary);
        }

        .team-section {
          display: none;
          animation: fadeIn 0.5s ease;
        }

        .team-section.active {
          display: block;
        }

        .members-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
          padding: 1rem;
        }

        .member-card {
          background: rgba(255,255,255,0.03);
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .member-card:hover {
          transform: translateY(-5px);
          background: rgba(255,255,255,0.05);
          border-color: var(--primary);
        }

        .member-image-wrapper {
          position: relative;
          padding-top: 100%;
          overflow: hidden;
        }

        .member-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .member-card:hover .member-image {
          transform: scale(1.1);
        }

        .member-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .member-card:hover .member-overlay {
          opacity: 1;
        }

        .view-profile {
          color: #fff;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          background: var(--primary);
          transform: translateY(20px);
          transition: transform 0.3s ease;
        }

        .member-card:hover .view-profile {
          transform: translateY(0);
        }

        .member-info {
          padding: 1.2rem;
        }

        .member-name {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.3rem;
        }

        .member-role {
          color: var(--primary);
          font-size: 0.9rem;
          font-weight: 500;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: none; }
        }

        @media (max-width: 768px) {
          .members-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 1.5rem;
          }
          
          .team-nav {
            gap: 0.7rem;
          }
          
          .team-nav-btn {
            padding: 0.6rem 1.2rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TeamMembers;
