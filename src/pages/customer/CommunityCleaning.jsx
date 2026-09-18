import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Sparkles, MapPin, Calendar, Clock, Image as ImageIcon, Send, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import PhotoUploader from '../../shared/components/ui/PhotoUploader';
import PricingEstimator from '../../features/community/components/PricingEstimator';
import { uploadToImageKit } from '../../shared/lib/imageKitService';
import { createCommunityRequest } from '../../features/community/state/communitySlice';
import serviceApi from '../../features/services/api/serviceApi';

export const CommunityCleaning = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [services, setServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState('');
  const [areaType, setAreaType] = useState('STREET');
  const [cleaningType, setCleaningType] = useState('DEEP_SWEEPING');
  const [areaRange, setAreaRange] = useState('100m');
  const [address, setAddress] = useState(user?.address || '');
  const [landmark, setLandmark] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeSlot, setTimeSlot] = useState('08:00 AM - 11:00 AM');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState([]);
  const [price, setPrice] = useState(499);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Fetch cleaning service from backend to attach valid service ObjectId
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const fetched = await serviceApi.getServices();
        setServices(fetched);
        // Find a cleaning service or use first available
        const cleanService = fetched.find(
          (s) => s.category?.toLowerCase().includes('clean') || s.title?.toLowerCase().includes('clean')
        );
        if (cleanService) {
          setSelectedServiceId(cleanService.id);
        } else if (fetched.length > 0) {
          setSelectedServiceId(fetched[0].id);
        }
      } catch (err) {
        console.warn('Failed to load services:', err);
      }
    };
    fetchServices();
  }, []);

  const areaTypeOptions = [
    { id: 'STREET', label: 'Street / Colony Road' },
    { id: 'PARK', label: 'Public Park / Playground' },
    { id: 'SOCIETY_COMPOUND', label: 'Apartment / Society Compound' },
    { id: 'MARKET', label: 'Market / Commercial Lane' },
    { id: 'DRAINAGE', label: 'Stormwater Open Drains' },
    { id: 'WASTE_DUMP', label: 'Unsanctioned Garbage Dump Zone' },
  ];

  const cleaningTypeOptions = [
    { id: 'LITTER_PICKUP', label: 'Litter & Plastic Collection' },
    { id: 'DEEP_SWEEPING', label: 'Heavy Road & Surface Sweeping' },
    { id: 'DEBRIS_REMOVAL', label: 'Debris & Rubble Clearance' },
    { id: 'DISINFECTION_SPRAY', label: 'Sanitizing / Disinfection Spray' },
    { id: 'DRAIN_DESILTING', label: 'Open Drain De-silting' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      setErrorMsg('Please enter the area address or landmark location.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Process uploaded photos through ImageKit
      const uploadedUrls = [];
      for (const photo of photos) {
        const res = await uploadToImageKit(photo, `community_req_${Date.now()}.jpg`, ['request']);
        uploadedUrls.push(res.url);
      }

      const payload = {
        customerId: user?.id || user?._id,
        serviceId: selectedServiceId || services[0]?.id || undefined,
        serviceType: 'COMMUNITY',
        requestMode: 'broadcast',
        address: `${address}${landmark ? ` (Near ${landmark})` : ''}`,
        date,
        timeSlot,
        price,
        paymentMethod: 'Cash After Service',
        paymentStatus: 'PENDING',
        description: description || `Community cleaning for ${areaType.replace(/_/g, ' ')} (${cleaningType.replace(/_/g, ' ')})`,
        photos: uploadedUrls,
        communityDetails: {
          areaType,
          cleaningType,
          areaRange,
          landmark,
          proofBefore: uploadedUrls,
          proofAfter: [],
        },
      };

      await dispatch(createCommunityRequest(payload)).unwrap();
      navigate('/customer/community/requests');
    } catch (err) {
      console.error('Request creation error:', err);
      const detailedMessage =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to submit community cleaning request. Please try again.';
      setErrorMsg(detailedMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <button
        type="button"
        onClick={() => navigate('/customer/community')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Community Hub
      </button>

      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
          <Sparkles className="w-4 h-4" /> Civic Sanitation
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1">
          Post a Community Cleaning Drive
        </h1>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Directly mobilize local Saathi workers for neighbourhood cleanup with guaranteed ImageKit visual verification.
        </p>
      </div>

      {errorMsg && (
        <div className="p-3.5 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 rounded-xl text-xs font-semibold border border-rose-200 dark:border-rose-900">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Area Details */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <MapPin className="w-4 h-4 text-indigo-600" /> 1. Area & Scope Specification
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Zone / Area Type
              </label>
              <select
                value={areaType}
                onChange={(e) => setAreaType(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {areaTypeOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Sanitation Task Required
              </label>
              <select
                value={cleaningType}
                onChange={(e) => setCleaningType(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                {cleaningTypeOptions.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Approximate Area Span / Length
              </label>
              <select
                value={areaRange}
                onChange={(e) => setAreaRange(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="50m">Compact Spot (~50 meters / 200 sq.ft)</option>
                <option value="100m">Standard Stretch (~100 meters / 500 sq.ft)</option>
                <option value="250m">Broad Avenue (~250 meters / 1200 sq.ft)</option>
                <option value="500m+">Full Colony Zone (500+ meters)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Nearby Landmark / Reference
              </label>
              <input
                type="text"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                placeholder="E.g. Opposite Community Hall Gate #2"
                className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Exact Location / Address *
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="E.g. Sector 4, Main Market Road, Green Park Colony"
                className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Step 2: Schedule & Requirements */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-600" /> 2. Schedule & Sanitation Needs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Preferred Drive Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Time Window
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="07:00 AM - 09:00 AM">Early Morning (07:00 AM - 09:00 AM)</option>
                <option value="09:00 AM - 12:00 PM">Morning (09:00 AM - 12:00 PM)</option>
                <option value="02:00 PM - 05:00 PM">Afternoon (02:00 PM - 05:00 PM)</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                Specific Instructions / Issue Details
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Mention specific waste hotspots, overgrown weeds, stagnant puddles, or safety items required..."
                className="w-full text-xs rounded-xl border border-slate-300 dark:border-slate-700 p-3 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Step 3: Initial Photos */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-indigo-600" /> 3. Ground Reality Photos (Pre-Clean)
          </h2>
          <p className="text-xs text-slate-500">
            Upload current state photos. These will be synced to ImageKit and serve as the baseline benchmark.
          </p>
          <PhotoUploader photos={photos} onPhotosChange={setPhotos} maxPhotos={4} />
        </div>

        {/* Step 4: Transparent Fair Pricing */}
        <PricingEstimator
          areaType={areaType}
          cleaningType={cleaningType}
          areaRange={areaRange}
          onPriceCalculated={setPrice}
        />

        {/* Submit CTA */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          {isSubmitting ? 'Posting Community Request via ImageKit...' : `Post Community Request (₹${price})`}
        </button>
      </form>
    </div>
  );
};

export default CommunityCleaning;
