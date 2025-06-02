import React from 'react';

const pageStyles = {
  padding: '20px',
};

const recommendationAreaPlaceholderStyles = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  marginTop: '20px',
};

const recommendationCardPlaceholderStyles = {
  border: '1px solid #eee',
  borderRadius: '8px',
  padding: '15px',
  width: '200px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const RecommendationsPage = () => {
  return (
    <div style={pageStyles}>
      <h1>Personalized Recommendations</h1>
      <p>Here you'll find financial products, services, and tips tailored just for you based on your profile and activity.</p>

      <div style={{ marginTop: '30px' }}>
        <h3>Your Recommendations (Placeholder)</h3>
        <div style={recommendationAreaPlaceholderStyles}>
          {/* Recommendation items will be mapped here */}
          <div style={recommendationCardPlaceholderStyles}>
            <h4>Recommendation 1</h4>
            <p>Details about the first recommended item.</p>
          </div>
          <div style={recommendationCardPlaceholderStyles}>
            <h4>Recommendation 2</h4>
            <p>Details about the second recommended item.</p>
          </div>
          <div style={recommendationCardPlaceholderStyles}>
            <h4>Recommendation 3</h4>
            <p>Details about the third recommended item.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsPage;
