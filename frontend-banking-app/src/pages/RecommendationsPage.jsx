import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'; // To get token
import { getRecommendations } from '../services/recommendationService.js';

const pageStyles = {
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const loadingErrorStyles = {
  textAlign: 'center',
  padding: '20px',
  fontSize: '1.2em',
};

const recommendationsGridStyles = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', // Responsive grid
  gap: '20px',
  marginTop: '20px',
};

const recommendationCardStyles = {
  border: '1px solid #e0e0e0',
  borderRadius: '8px',
  padding: '20px',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
  transition: 'transform 0.2s ease-in-out',
  ':hover': { // Note: pseudo-classes like :hover don't work directly in inline styles
    transform: 'translateY(-5px)', // This would need a CSS class or styled-components
  }
};

const cardTitleStyles = {
  fontSize: '1.3em',
  fontWeight: 'bold',
  color: '#333',
  marginBottom: '10px',
};

const cardDescriptionStyles = {
  fontSize: '0.95em',
  color: '#555',
  marginBottom: '15px',
  lineHeight: '1.5',
};

const cardDetailsStyles = {
  fontSize: '0.85em',
  color: '#777',
};

const RecommendationsPage = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Start loading on mount
  const [error, setError] = useState('');
  const auth = useAuth();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!auth.token) {
        setError('You must be logged in to see recommendations.');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError('');
      try {
        const response = await getRecommendations(auth.token);
        if (response.success && response.data) {
          setRecommendations(response.data.recommendations);
        } else {
          setError(response.error?.message || 'Could not fetch recommendations.');
        }
      } catch (err) {
        console.error("Recommendations page error:", err);
        setError('An unexpected error occurred while fetching recommendations.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [auth.token]); // Re-fetch if token changes (e.g., re-login)

  if (isLoading) {
    return <div style={loadingErrorStyles}>Loading recommendations...</div>;
  }

  if (error) {
    return <div style={{ ...loadingErrorStyles, color: 'red' }}>Error: {error}</div>;
  }

  if (recommendations.length === 0) {
    return <div style={loadingErrorStyles}>No recommendations available for you at this moment.</div>;
  }

  return (
    <div style={pageStyles}>
      <h1>Personalized Recommendations</h1>
      <p>Here are some financial products and services tailored just for you:</p>
      <div style={recommendationsGridStyles}>
        {recommendations.map((rec) => (
          <div key={rec.id} style={recommendationCardStyles}
               className="recommendation-card"> {/* Added class for potential CSS :hover */}
            <h3 style={cardTitleStyles}>{rec.name}</h3>
            <p style={cardDescriptionStyles}>{rec.description}</p>
            {rec.details && (
              <div style={cardDetailsStyles}>
                <strong>Type:</strong> {rec.details.type} <br />
                {rec.details.interest_rate && <><strong>Interest Rate:</strong> {rec.details.interest_rate}<br /></>}
                {rec.details.loan_rate && <><strong>Loan Rate:</strong> {rec.details.loan_rate}<br /></>}
                {rec.details.min_investment && <><strong>Min. Investment:</strong> {rec.details.min_investment}<br /></>}
                {rec.details.annual_fee && <><strong>Annual Fee:</strong> {rec.details.annual_fee}<br /></>}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendationsPage;
