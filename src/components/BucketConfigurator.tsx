import React, { useState } from 'react';
import { Bucket } from '../types';

interface BucketConfiguratorProps {
  buckets: Bucket[];
  onBucketsChange: (buckets: Bucket[]) => void;
}

const BucketConfigurator: React.FC<BucketConfiguratorProps> = ({ buckets, onBucketsChange }) => {
  const [editingBucket, setEditingBucket] = useState<string | null>(null);
  const [newValue, setNewValue] = useState('');

  const addBucket = () => {
    const newBucket: Bucket = {
      id: Date.now().toString(),
      name: `bucket${buckets.length + 1}`,
      values: []
    };
    onBucketsChange([...buckets, newBucket]);
  };

  const removeBucket = (bucketId: string) => {
    onBucketsChange(buckets.filter(bucket => bucket.id !== bucketId));
  };

  const updateBucketName = (bucketId: string, newName: string) => {
    onBucketsChange(buckets.map(bucket =>
      bucket.id === bucketId ? { ...bucket, name: newName } : bucket
    ));
  };

  const addValueToBucket = (bucketId: string, value: string) => {
    if (!value.trim()) return;
    onBucketsChange(buckets.map(bucket =>
      bucket.id === bucketId 
        ? { ...bucket, values: [...bucket.values, value.trim()] }
        : bucket
    ));
  };

  const removeValueFromBucket = (bucketId: string, valueIndex: number) => {
    onBucketsChange(buckets.map(bucket =>
      bucket.id === bucketId
        ? { ...bucket, values: bucket.values.filter((_, idx) => idx !== valueIndex) }
        : bucket
    ));
  };

  const moveBucket = (bucketId: string, direction: 'up' | 'down') => {
    const currentIndex = buckets.findIndex(bucket => bucket.id === bucketId);
    if (currentIndex === -1) return;
    
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (newIndex < 0 || newIndex >= buckets.length) return;
    
    const newBuckets = [...buckets];
    [newBuckets[currentIndex], newBuckets[newIndex]] = [newBuckets[newIndex], newBuckets[currentIndex]];
    onBucketsChange(newBuckets);
  };

  return (
    <div className="bucket-configurator">
      <h3>Naming Buckets</h3>
      
      {buckets.map((bucket, index) => (
        <div key={bucket.id} className="bucket-item">
          <div className="bucket-header">
            <input
              type="text"
              value={bucket.name}
              onChange={(e) => updateBucketName(bucket.id, e.target.value)}
              className="bucket-name-input"
            />
            <div className="bucket-controls">
              <button 
                onClick={() => moveBucket(bucket.id, 'up')}
                disabled={index === 0}
                className="move-button"
              >
                ↑
              </button>
              <button 
                onClick={() => moveBucket(bucket.id, 'down')}
                disabled={index === buckets.length - 1}
                className="move-button"
              >
                ↓
              </button>
              <button 
                onClick={() => removeBucket(bucket.id)}
                className="remove-button"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="bucket-values">
            {bucket.values.map((value, valueIndex) => (
              <div key={valueIndex} className="bucket-value">
                <span>{value}</span>
                <button
                  onClick={() => removeValueFromBucket(bucket.id, valueIndex)}
                  className="remove-value-button"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="add-value-form">
            <input
              type="text"
              value={editingBucket === bucket.id ? newValue : ''}
              onChange={(e) => setNewValue(e.target.value)}
              onFocus={() => setEditingBucket(bucket.id)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addValueToBucket(bucket.id, newValue);
                  setNewValue('');
                  setEditingBucket(null);
                }
              }}
              placeholder="Add value..."
              className="add-value-input"
            />
            <button
              onClick={() => {
                addValueToBucket(bucket.id, newValue);
                setNewValue('');
                setEditingBucket(null);
              }}
              className="add-value-button"
            >
              Add
            </button>
          </div>
        </div>
      ))}
      
      <button onClick={addBucket} className="add-bucket-button">
        Add Bucket
      </button>
    </div>
  );
};

export default BucketConfigurator;