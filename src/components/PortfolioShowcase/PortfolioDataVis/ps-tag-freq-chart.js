import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';
import SectionTitle from '../../section-title';

const TagFrequencyChart = ({ entries }) => {
  // console.log('TagFrequencyChart received entries:', entries); // Debug log

  const [screenWidth, setScreenWidth] = useState(800);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const tagFrequencyData = useMemo(() => {
    // Guard clause for empty/invalid entries
    if (!entries || !Array.isArray(entries)) {
      console.log('Invalid or empty entries:', entries);
      return [];
    }

    // Count frequency of each tag
    const tagCounts = entries.reduce((acc, entry) => {
      if (!entry.techTags) {
        console.log('Entry missing techTags:', entry);
        return acc;
      }
      
      entry.techTags.forEach(tag => {
        acc[tag] = (acc[tag] || 0) + 1;
      });
      return acc;
    }, {});

    // Convert to array format and sort by frequency
    const sortedData = Object.entries(tagCounts)
      .map(([tag, count]) => ({
        tag,
        count
      }))
      .sort((a, b) => b.count - a.count);

    console.log('Processed tag frequency data:', sortedData); // Debug log

    // Find the max count for scaling
    const maxCount = sortedData.length > 0 ? sortedData[0].count : 1;
    
    // Add color based on frequency
    return sortedData.map(item => ({
      ...item,
      fill: `var(--theme-primary)`,
      opacity: 0.4 + ((item.count / maxCount) * 0.6)
    }));
  }, [entries]);

  // Guard clause for empty data
  if (!tagFrequencyData.length) {
    return (
      <div className="w-full p-4 text-center">
        <p className="text-gray-500">No tag data available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <SectionTitle title="Portfolio Tech Distribution*" subtitle="*in-progress content loading, many more projects from my career-so-far coming soon" targetId={'tag-freq-chart'} />
      {/* <h2 className="text-2xl font-bold mb-4">Technology Tag Distribution</h2> */}
      <div className="h-96" 
        style={{ 
          height: screenWidth > 991 ? '50vh' : '200vh', 
          // position: 'relative', 
          // top: '-4rem', 
          // marginBottom: '10rem' 
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={tagFrequencyData}
            layout={screenWidth <= 991 ? 'vertical' : 'horizontal'}
            margin={{
              top: screenWidth <= 991 ? 20 : 5,
              right: 0,
              left: 0,
              bottom: 100
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {screenWidth > 991 && <XAxis dataKey="tag" type="category" angle={-45} textAnchor="end" height={100} interval={0} />}
            {screenWidth > 991 && <YAxis type="number" domain={[0, 'dataMax']} interval={0} padding={{top: 10}} />}
            {screenWidth <= 991 && 
              <XAxis type="number" domain={[0, 'dataMax']} interval={0} padding={{right: 10, bottom: 100}} margin={{bottom: 20}} xAxisId={'top'} orientation='top'>
                <Label value="Projects Using Tech" offset={-10} position="insideTop" />                              
              </XAxis>
            }
            {screenWidth <= 991 && <YAxis dataKey="tag" label={false} type="category" angle={0} textAnchor="end" width={175} padding={{left: 50}} interval={0} />}

            <Tooltip
              content={({ active, payload }) => {
                if (!active || !payload?.length) return null;
                
                return (
                  <div className="bg-white border border-gray-200 p-2 shadow-lg rounded">
                    <p className="font-medium">{payload[0].payload.tag}</p>
                    <p>Used in {payload[0].value} project{payload[0].value > 1 && 's'}</p>
                  </div>
                );
              }}
            />
            <Bar
              dataKey="count"
              radius={screenWidth <= 991 ? [0, 7, 7, 0] : [7, 7, 0, 0]}
              fill={undefined}
              opacity={undefined}
              xAxisId={screenWidth <= 991 ? 'top' : undefined} // ensures the x-axis labels are at the top on mobile because you have to scroll a bit before you see the bottom of the chart
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TagFrequencyChart;