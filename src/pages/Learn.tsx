import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

/**
 * Learn Page Component
 * 
 * Displays reference library for ARC Triangle, Tone Scale, and EQ frameworks.
 * Includes search/filter functionality and navigation between sections.
 * 
 * @component
 */
function Learn() {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState(
    searchParams.get('section') || 'all'
  );

  /**
   * Handle section navigation
   */
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    const params = new URLSearchParams();
    params.set('section', section);
    window.history.pushState({}, '', `?${params.toString()}`);
  };

  /**
   * Filter content based on search query and active section
   */
  const filteredContent = (section: string) => {
    if (searchQuery === '') {
      return getSectionContent(section);
    }
    
    const query = searchQuery.toLowerCase();
    const sectionData = getSectionContent(section);
    
    return {
      title: sectionData.title,
      description: sectionData.description,
      content: sectionData.content.filter((item: { title: string; description: string }) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
      ),
    };
  };

  /**
   * Get content for a specific section
   */
  const getSectionContent = (section: string) => {
    switch (section) {
      case 'arc':
        return {
          title: 'ARC Triangle',
          description: 'The ARC Triangle is a fundamental framework for understanding human interaction, consisting of three interdependent elements.',
          content: [
            {
              title: 'Appreciation',
              description: 'Value, care, or regard for others. Also known as "Affinity" in original Scientology terminology.',
              details: 'Appreciation is the expression of value towards something or someone. It can be expressed through words, actions, or gestures. Higher appreciation leads to better relationships and communication.',
            },
            {
              title: 'Reality',
              description: 'Shared understanding or truth between parties. The degree to which people agree on what is happening.',
              details: 'Reality in the ARC context refers to the shared understanding between people. When reality is high, people have a common understanding of situations. Disagreements on reality can lead to conflict.',
            },
            {
              title: 'Communication',
              description: 'Flow of information between parties. The exchange of ideas, feelings, and information.',
              details: 'Communication is the exchange of energy and information. Effective communication requires both appreciation and shared reality. Without communication, appreciation and reality cannot be established.',
            },
            {
              title: 'Interdependence',
              description: 'All three elements are interdependent - each affects the others.',
              details: 'The ARC elements work together: Communication builds Appreciation, which improves Reality, which enhances Communication. Breaking one element affects all others.',
            },
          ],
        };
      case 'tone':
        return {
          title: 'Tone Scale',
          description: 'The Tone Scale, developed by L. Ron Hubbard in the 1950s, is an emotional gradient scale measuring states of consciousness from -40 to +40.',
          content: [
            {
              title: 'Serenity of Beingness (+40)',
              description: 'The peak state of emotional well-being and spiritual awareness.',
              details: 'At +40, a person experiences complete serenity and freedom from all limitations. This is considered the highest state of consciousness.',
            },
            {
              title: 'Ecstatic (+30)',
              description: 'Intense joy and celebration, pure happiness without cause.',
              details: 'Ecstatic represents pure joy that exists independently of external circumstances. It is a state of complete emotional freedom.',
            },
            {
              title: 'Gay/Cheerful (+15 to +10)',
              description: 'Cheerfulness, carefree attitude, and positive outlook.',
              details: 'The "Gay" level (historical terminology) represents a carefree, cheerful state. People at this level enjoy life and find pleasure in simple things.',
            },
            {
              title: 'Enthusiasm (+4)',
              description: 'Active interest and engagement with life.',
              details: 'Enthusiasm represents active participation in life. People at this level are interested and engaged with their surroundings.',
            },
            {
              title: 'Neutrality (0)',
              description: 'The neutral point - body death level, neither positive nor negative.',
              details: 'Neutrality is the dividing line between positive and negative tones. At this level, there is no emotional charge - it is the state of physical matter.',
            },
            {
              title: 'Scepticism (-5)',
              description: 'Questioning and doubting what is presented.',
              details: 'Scepticism involves questioning and analyzing information. While useful for critical thinking, excessive scepticism can block learning.',
            },
            {
              title: 'Pessimism (-10)',
              description: 'Negative outlook and expectation of bad outcomes.',
              details: 'Pessimism involves expecting negative outcomes. This tone level is associated with complaining and finding fault.',
            },
            {
              title: 'Apathy (-30)',
              description: 'Lack of interest or concern, emotional detachment.',
              details: 'Apathy represents a state of disengagement from life. People at this level show little interest in their surroundings.',
            },
            {
              title: 'Total Failure (-40)',
              description: 'The lowest point on the scale, representing complete defeat.',
              details: 'Total Failure represents the lowest emotional state, characterized by feelings of complete defeat and hopelessness.',
            },
          ],
        };
      case 'eq':
        return {
          title: 'Emotional Intelligence',
          description: 'Emotional Intelligence (EQ) refers to the ability to recognize, understand, and manage emotions in oneself and others.',
          content: [
            {
              title: 'Goleman Model',
              description: 'Daniel Goleman\'s five-component model of emotional intelligence.',
              details: 'Goleman\'s model includes: Self-Awareness (recognizing own emotions), Self-Regulation (managing emotions), Motivation (driving force), Empathy (understanding others), and Social Skills (relationship management).',
            },
            {
              title: 'Six Seconds Model',
              description: 'Three core pursuits: Know Yourself, Care for Others, and Give Purpose.',
              details: 'The Six Seconds model focuses on: Know Yourself (understanding emotions), Care for Others (empathy and relationships), and Give Purpose (meaningful action).',
            },
            {
              title: 'Freedman-Fariselli Model',
              description: 'Eight competencies covering self-awareness, self-management, social awareness, and relationship management.',
              details: 'This model includes eight competencies: Emotional Self-Awareness, Self-Actualization, Emotional Self-Management, Empathy, Social Awareness, Conflict Management, Inspirational Leadership, and Positive Relationships.',
            },
            {
              title: 'ARC Trauma Model',
              description: 'Attachment, Regulation, and Competency - a framework for understanding trauma responses.',
              details: 'The ARC Trauma Model focuses on: Attachment (safety and connection), Regulation (managing emotional responses), and Competency (sense of effectiveness).',
            },
          ],
        };
      default:
        return {
          title: 'All Topics',
          description: 'Comprehensive overview of all learning topics including ARC Triangle, Tone Scale, and Emotional Intelligence.',
          content: [],
        };
    }
  };

  /**
   * Get all available sections
   */
  const sections = [
    { id: 'all', label: 'All Topics', icon: '📚' },
    { id: 'arc', label: 'ARC Triangle', icon: '🔺' },
    { id: 'tone', label: 'Tone Scale', icon: '📊' },
    { id: 'eq', label: 'Emotional Intelligence', icon: '🧠' },
  ];

  const currentContent = filteredContent(activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Learn</h1>
          <p className="text-gray-600">Reference library for ARC, Tone Scale & EQ frameworks</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Section Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <Button
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                variant={activeSection === section.id ? 'primary' : 'outline'}
                size="medium"
              >
                <span className="mr-2">{section.icon}</span>
                {section.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Content Section */}
        <Card className="mb-8 p-6 bg-white shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {currentContent.title}
          </h2>
          <p className="text-gray-600 mb-6">
            {currentContent.description}
          </p>

          {/* Content Items */}
          {activeSection !== 'all' && currentContent.content.length > 0 ? (
            <div className="space-y-6">
              {currentContent.content.map((item: { title: string; description: string; details: string }, index: number) => (
                <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{item.description}</p>
                  <p className="text-gray-500 text-sm">{item.details}</p>
                </div>
              ))}
            </div>
          ) : activeSection === 'all' ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sections.filter(s => s.id !== 'all').map((section) => (
                <Card
                  key={section.id}
                  className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="text-4xl mb-4">{section.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {section.label}
                  </h3>
                  <Button
                    onClick={() => handleSectionChange(section.id)}
                    variant="outline"
                    size="small"
                  >
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No content found for this section.</p>
          )}
        </Card>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              📐 ARC Triangle
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Learn about Appreciation, Reality, and Communication - the three elements of successful interaction.
            </p>
            <Button
              onClick={() => handleSectionChange('arc')}
              variant="outline"
              size="small"
            >
              View ARC
            </Button>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              📊 Tone Scale
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Explore the emotional gradient scale from -40 (Total Failure) to +40 (Serenity).
            </p>
            <Button
              onClick={() => handleSectionChange('tone')}
              variant="outline"
              size="small"
            >
              View Tone Scale
            </Button>
          </Card>

          <Card className="p-6 bg-white shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              🧠 Emotional Intelligence
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Discover multiple EQ frameworks including Goleman, Six Seconds, and ARC Trauma Model.
            </p>
            <Button
              onClick={() => handleSectionChange('eq')}
              variant="outline"
              size="small"
            >
              View EQ
            </Button>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Tone Navigator - Educational reference library
          </p>
          <p className="text-gray-500 text-sm mt-4">
            © 2026 Tone Navigator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Learn;