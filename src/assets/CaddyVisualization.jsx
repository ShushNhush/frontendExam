import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for our visualization
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SimulationButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: 500;
  transition: all 0.2s ease;
  background-color: ${props => props.$isActive ? '#222' : '#333'};
  color: white;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: ${props => props.$isActive ? '#222' : '#444'};
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
`;

const VisualizationContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 32rem;
`;

const AnimatedDot = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #22c55e;
  transform: translateX(-6px);
  top: 60px;
  left: ${props => props.$path === 'api' ? '130px' : '150px'};
  animation: ${props => props.$path === 'api' ? 'flowDown' : 'flowDiagonal'} 1s linear forwards;

  @keyframes flowDown {
    0% { transform: translateY(0) translateX(-6px); }
    100% { transform: translateY(140px) translateX(-6px); }
  }

  @keyframes flowDiagonal {
    0% { transform: translate(-6px, 0); }
    100% { transform: translate(130px, 140px); }
  }
`;

const StatusText = styled.p`
  text-align: center;
  color: #666;
`;

const CaddyVisualization = () => {
  const [activePath, setActivePath] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const defaultColor = "#666";
  const activeColor = "#22c55e";
  
  const simulateRequest = (type) => {
    setActivePath(type);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1000);
  };

  return (
    <Container>
      <ButtonContainer>
        <SimulationButton 
          $isActive={activePath === 'api'}
          onClick={() => simulateRequest('api')}
        >
          Simulate API Call
        </SimulationButton>
        <SimulationButton 
          $isActive={activePath === 'static'}
          onClick={() => simulateRequest('static')}
        >
          Simulate Static
        </SimulationButton>
      </ButtonContainer>

      <VisualizationContainer>
        <svg viewBox="0 0 400 300" style={{ width: '100%' }}>
          {/* SVG content stays the same */}
          <path
            d="M200 20 L200 60"
            stroke={defaultColor}
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <text x="210" y="45" fill={defaultColor}>Request</text>

          <rect
            x="150"
            y="60"
            width="100"
            height="60"
            fill="white"
            stroke="#333"
            strokeWidth="2"
          />
          <text x="175" y="95" fill="#333">Caddy</text>

          <path
            d="M175 120 L175 200"
            stroke={activePath === 'api' ? activeColor : defaultColor}
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <text 
            x="130" 
            y="160" 
            fill={activePath === 'api' ? activeColor : defaultColor}
          >
            /api/*
          </text>

          <path
            d="M225 120 L325 200"
            stroke={activePath === 'static' ? activeColor : defaultColor}
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
          <text 
            x="235" 
            y="160" 
            fill={activePath === 'static' ? activeColor : defaultColor}
          >
            /static/*
          </text>

          <rect
            x="125"
            y="200"
            width="100"
            height="60"
            fill="white"
            stroke={activePath === 'api' ? activeColor : defaultColor}
            strokeWidth="2"
          />
          <text 
            x="145" 
            y="235" 
            fill={activePath === 'api' ? activeColor : defaultColor}
          >
            Backend
          </text>

          <rect
            x="275"
            y="200"
            width="100"
            height="60"
            fill="white"
            stroke={activePath === 'static' ? activeColor : defaultColor}
            strokeWidth="2"
          />
          <text 
            x="285" 
            y="235" 
            fill={activePath === 'static' ? activeColor : defaultColor}
          >
            Static Files
          </text>

          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill={activePath ? activeColor : defaultColor}
              />
            </marker>
          </defs>
        </svg>

        {isAnimating && <AnimatedDot $path={activePath} />}
      </VisualizationContainer>

      <StatusText>
        {activePath === 'api' && 
          "Caddy is forwarding this request to the backend API (port 7171)"
        }
        {activePath === 'static' &&
          "Caddy is serving static files directly from the file system"
        }
        {!activePath &&
          "Click a button above to simulate different types of requests"
        }
      </StatusText>
    </Container>
  );
};

export default CaddyVisualization;