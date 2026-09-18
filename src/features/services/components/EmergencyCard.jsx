import React, { useState } from 'react';
import { AlertCircle, Zap, Wrench, ShieldAlert, Check, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../../shared/hooks/useLanguage';
import PhotoUploader from '../../../shared/components/ui/PhotoUploader';

export const EmergencyCard = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [selectedIssue, setSelectedIssue] = useState('plumbing');
  const [photos, setPhotos] = useState([]);
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);

  const emergencyTypes = [
    { id: 'plumbing', label: 'Water Leak / Pipe Burst', icon: Wrench, time: '12-15m' },
    { id: 'electrical', label: 'Short Circuit / Sparking', icon: Zap, time: '10-15m' },
    { id: 'drainage', label: 'Overflowing Sewage Drain', icon: ShieldAlert, time: '15-20m' },
  ];

  const handleInstantDispatch = () => {
    navigate(`/customer/book?emergency=true&category=${selectedIssue}`);
  };

  return (
  <div></div>
  );
};

export default EmergencyCard;
