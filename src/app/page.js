'use client';

import React, { useState } from 'react';
import { Loader2 } from 'lucide-react';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';



export default function DataProcessor() {
  const [inputData, setInputData] = useState('');
  const [separator, setSeparator] = useState(',');
  const [batchSize, setBatchSize] = useState('500');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [groupByPrefix, setGroupByPrefix] = useState(true);

  const processData = async () => {
    if (!inputData.trim()) {
      setError('Please enter some data');
      return;
    }

    const parsedBatchSize = parseInt(batchSize, 10);
    if (isNaN(parsedBatchSize) || parsedBatchSize < 1) {
      setError('Please enter a valid batch size (minimum 1)');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputData,
          separator: separator || ',',
          batchSize: parsedBatchSize,
          groupByPrefix
        }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResults(data);
      }
    } catch (err) {
      setError(`Failed to process data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, event) => {
    const button = event.currentTarget;
    await navigator.clipboard.writeText(text);
    button.innerText = 'Copied!';
    setTimeout(() => {
      button.innerText = 'Copy';
    }, 2000);
  };

  const handleBatchSizeChange = (e) => {
    const value = e.target.value;
    // Allow empty string or positive numbers
    if (value === '' || (/^\d+$/.test(value) && parseInt(value) > 0)) {
      setBatchSize(value);
    }
  };

  return (
    <div className="page-container">

      <div className="content-wrapper">
        <div className="header">
          <h2 className="title">Data Batch Processor</h2>
          <a href="https://www.linkedin.com/in/syedmustafa177/" className="subtitle">By Syed Mustafa Ali</a>
        </div>

        <div className="input-card">
          <div className="input-group">
            <label className="input-label">
              Paste your data below (one entry per line)
            </label>
            <textarea
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="data-input"
              placeholder={`ABC123456
ZZZ789012
CL345678
CI901234
20567890
CLM567890`}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="input-group">
              <label className="input-label">
                Separator (default: comma ",")
              </label>
              <input
                type="text"
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-xl 
                           font-mono text-sm focus:ring-2 focus:ring-blue-500 
                           focus:border-blue-500 transition-all duration-200"
                placeholder="Enter separator (e.g., , or | or ; )"
                maxLength={5}
              />
            </div>

            <div className="input-group">
              <label className="input-label">
                Batch Size (default: 500)
              </label>
              <input
                type="text"
                value={batchSize}
                onChange={handleBatchSizeChange}
                className="w-full p-2 border border-gray-300 rounded-xl 
                           font-mono text-sm focus:ring-2 focus:ring-blue-500 
                           focus:border-blue-500 transition-all duration-200"
                placeholder="Enter batch size (minimum 1)"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center">
            <input
              type="checkbox"
              id="groupByPrefix"
              checked={groupByPrefix}
              onChange={(e) => setGroupByPrefix(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 
                         focus:ring-blue-500 cursor-pointer"
            />
            <label htmlFor="groupByPrefix" className="ml-2 text-sm text-gray-700 cursor-pointer">
              Separate records by first 3 characters (e.g., &quot;ABC123456&quot;, &quot;ZZZ123456&quot; in different groups)
            </label>
          </div>

          <button
            onClick={processData}
            disabled={loading}
            className={`animate-button mt-4 disabled:opacity-50 disabled:cursor-not-allowed ${loading ? 'cursor-not-allowed' : ''
              }`}
          >
            {loading ? (
              <span className="flex items-center">
                <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                Processing...
              </span>
            ) : (
              'Process Data'
            )}
          </button>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="results-container">
            {results.map((typeResult, index) => (
              <div key={index} className="result-card">
                <div className="result-header">
                  <h3 className="result-title">
                    {typeResult.type} Records
                  </h3>
                  <span className="record-count">
                    {typeResult.total_records} records
                  </span>
                </div>

                <div className="batches-container">
                  {typeResult.batches.map((batch, batchIndex) => (
                    <div key={batchIndex} className="batch-card">
                      <div className="batch-header">
                        <h4 className="batch-title">
                          Batch {batch.batch_number}
                          <span className="batch-count">
                            ({batch.records} records)
                          </span>
                        </h4>
                        <button
                          onClick={(e) => copyToClipboard(batch.data, e)}
                          className="copy-button"
                        >
                          Copy
                        </button>
                      </div>
                      <div className="batch-data">
                        {batch.data}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        )}



      </div>
      <Footer />
      <Analytics />
    </div>

  );

}

