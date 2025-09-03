import React, { useState } from 'react';

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
