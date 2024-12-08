import { NextResponse } from 'next/server';
import { defaultDict } from '../../../utils/helpers';

export async function POST(request) {
  try {
    const { text, separator = ',', batchSize = 500, groupByPrefix = true } = await request.json();
    
    if (!text) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    // Convert batchSize to number and validate
    const parsedBatchSize = parseInt(batchSize, 10);
    if (isNaN(parsedBatchSize) || parsedBatchSize < 1) {
      return NextResponse.json({ error: 'Invalid batch size' }, { status: 400 });
    }

    const results = processData(text, separator, parsedBatchSize, groupByPrefix);
    return NextResponse.json(results);
    
  } catch (error) {
    return NextResponse.json({ error: `Server error: ${error.message}` }, { status: 500 });
  }
}

function processData(textData, separator = ',', batchSize = 500, groupByPrefix = true) {
  // Split the input text into lines
  const lines = textData.split('\n').map(line => line.trim()).filter(Boolean);
  
  if (groupByPrefix) {
    // Use a dictionary to automatically create categories
    const dataTypes = defaultDict(Array);
    
    // Categorize each line based on first 3 characters
    for (const line of lines) {
      if (line.length >= 3) {
        const prefix = line.slice(0, 3);
        dataTypes[prefix].push(line);
      }
    }
    
    // Process results
    const results = [];
    for (const [dataType, values] of Object.entries(dataTypes)) {
      if (!values.length) continue;
      
      const typeResult = {
        type: dataType,
        total_records: values.length,
        batches: []
      };
      
      // Calculate number of batches needed
      const numBatches = Math.ceil(values.length / batchSize);
      
      // Create batches
      for (let batchNum = 0; batchNum < numBatches; batchNum++) {
        const startIdx = batchNum * batchSize;
        const endIdx = Math.min((batchNum + 1) * batchSize, values.length);
        const batchData = values.slice(startIdx, endIdx);
        
        typeResult.batches.push({
          batch_number: batchNum + 1,
          records: batchData.length,
          data: batchData.join(separator)
        });
      }
      
      results.push(typeResult);
    }
    
    return results;
  } else {
    // Process all data in a single group
    return [{
      type: 'All Records',
      total_records: lines.length,
      batches: Array.from({ length: Math.ceil(lines.length / batchSize) }, (_, batchNum) => {
        const startIdx = batchNum * batchSize;
        const endIdx = Math.min((batchNum + 1) * batchSize, lines.length);
        const batchData = lines.slice(startIdx, endIdx);
        
        return {
          batch_number: batchNum + 1,
          records: batchData.length,
          data: batchData.join(separator)
        };
      })
    }];
  }
}