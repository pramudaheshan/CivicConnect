import React from 'react';
import { Scale, Heart, Globe2, Users, Shield, Trophy } from 'lucide-react';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
          {icon}
        </div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default function AboutPage() {
  const values = [
    {
      icon: <Scale className="h-6 w-6" />,
      title: "Justice & Fairness",
      description: "We promote fair trade practices and ensure equitable treatment for all stakeholders in our supply chain."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Social Impact",
      description: "Every purchase contributes to initiatives that build stronger, more peaceful communities worldwide."
    },
    {
      icon: <Globe2 className="h-6 w-6" />,
      title: "Global Responsibility",
      description: "We source products responsibly and work to minimize our environmental impact across all operations."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community Focus",
      description: "Building strong relationships with artisans, suppliers, and customers to create lasting positive change."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Ethical Standards",
      description: "Maintaining the highest standards of integrity in all our business practices and partnerships."
    },
    {
      icon: <Trophy className="h-6 w-6" />,
      title: "Quality Assurance",
      description: "Delivering premium products while ensuring sustainable and ethical production methods."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Our Commitment to Peace & Justice
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          At PeaceCommerce, we believe commerce can be a powerful force for positive change. 
          Our mission is to promote peace, justice, and strong institutions through ethical business practices.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1920"
            alt="Team meeting"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Founded in 2025, PeaceCommerce emerged from a vision to transform how business impacts society. 
              We recognized that commerce, when conducted ethically and mindfully, can be a powerful catalyst for positive change.
            </p>
            <p>
              Our platform connects conscious consumers with products that make a difference. 
              Each item in our marketplace is carefully selected to ensure it meets our strict ethical standards 
              and contributes to our mission of promoting peace and justice.
            </p>
            <p>
              We work closely with artisans, manufacturers, and suppliers who share our values and commitment 
              to building strong, just, and peaceful communities.
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard key={index} {...value} />
          ))}
        </div>
      </div>

      {/* Impact Section */}
      <div className="bg-blue-700 rounded-xl text-white p-12 mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Impact</h2>
          <p className="text-lg opacity-90">
            Through our commitment to ethical commerce, we've achieved meaningful change
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">100+</div>
            <div className="text-lg opacity-90">Artisan Communities Supported</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">$500K+</div>
            <div className="text-lg opacity-90">Invested in Peace Initiatives</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">50+</div>
            <div className="text-lg opacity-90">Countries Impacted</div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Mission</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Be part of the change. Shop our curated collection of products that make a difference 
          and help us build a more peaceful, just world.
        </p>
        <a 
          href="/shop" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Explore Our Products
        </a>
      </div>
    </div>
  );
}