import { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { Check, ChevronRight, ChevronLeft, User, Home as HomeIcon, FileText, Info, Search, UserPlus } from 'lucide-react';
import { INDIAN_STATES, ALL_OCCUPATIONS, EDUCATION_LEVELS, LANDHOLDING_TYPES } from '@/data/schemes';
import type { CitizenProfile, Gender, AreaType } from '@/types/welfare';

const MARITAL = ['Single', 'Married', 'Widowed', 'Divorced'];

export function ProfilePage() {
  const { t, navigate, currentProfile, setProfile, isNewCitizen } = useApp();
  const [step, setStep] = useState(1);
  const savedRef = useRef(false);

  const [formData, setFormData] = useState<CitizenProfile>({
    ...currentProfile,
    age: currentProfile.age || 0,
    familyMembers: currentProfile.familyMembers || 1,
    householdIncome: currentProfile.householdIncome || 0,
    dependents: currentProfile.dependents || 0,
  });

  useEffect(() => {
    if (savedRef.current) {
      savedRef.current = false;
      return;
    }
    setFormData({
      ...currentProfile,
      age: currentProfile.age || 0,
      familyMembers: currentProfile.familyMembers || 1,
      householdIncome: currentProfile.householdIncome || 0,
      dependents: currentProfile.dependents || 0,
    });
    setStep(1);
  }, [currentProfile]);

  const update = (key: keyof CitizenProfile, value: string | number | boolean) => {
    setFormData((p) => ({ ...p, [key]: value }));
  };

  const updateStr = (key: keyof CitizenProfile) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    update(key, e.target.value);
  };

  const updateNum = (key: keyof CitizenProfile) => (e: React.ChangeEvent<HTMLInputElement>) => {
    update(key, Number(e.target.value) || 0);
  };

  // Auto-derive flags
  const derivedIsFarmer = formData.occupation === 'Farmer' || formData.categories.includes('Farmer');
  const derivedIsStudent = formData.occupation === 'Student' || formData.categories.includes('Student');
  const derivedIsSenior = formData.age >= 60;

  const handleSave = () => {
    const finalProfile: CitizenProfile = {
      ...formData,
      isFarmer: derivedIsFarmer,
      isStudent: derivedIsStudent,
      isSeniorCitizen: derivedIsSenior,
    };
    savedRef.current = true;
    setProfile(finalProfile);
    setStep(4);
  };

  const steps = [
    { num: 1, label: t('profile.basic'), icon: User },
    { num: 2, label: t('profile.household'), icon: HomeIcon },
    { num: 3, label: t('profile.details'), icon: Info },
    { num: 4, label: t('profile.documents'), icon: FileText },
  ];

  const title = isNewCitizen ? 'Create New Citizen Profile' : t('profile.title');

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-2 mb-1">
          {isNewCitizen && <UserPlus className="w-6 h-6 text-primary-600" />}
          <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
        </div>
        <p className="text-sm text-neutral-500 mb-6">Your information helps us find relevant schemes. We only collect what is necessary.</p>

        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isDone = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      isDone ? 'bg-success-500 text-white' : isCurrent ? 'bg-primary-600 text-white ring-4 ring-primary-100' : 'bg-neutral-100 text-neutral-400'
                    }`}
                  >
                    {isDone ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs font-medium ${isCurrent || isDone ? 'text-neutral-800' : 'text-neutral-400'}`}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 -mt-5 rounded ${isDone ? 'bg-success-500' : 'bg-neutral-200'}`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <div className="card p-6 sm:p-8 animate-fade-in">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="label">Full Name</label>
                <input className="input" value={formData.name} onChange={updateStr('name')} placeholder="Enter your name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Age</label>
                  <input className="input" type="number" value={formData.age || ''} onChange={updateNum('age')} placeholder="e.g. 25" />
                </div>
                <div>
                  <label className="label">Gender</label>
                  <select className="input" value={formData.gender} onChange={updateStr('gender')}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">State</label>
                  <select className="input" value={formData.state} onChange={updateStr('state')}>
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label">District</label>
                  <input className="input" value={formData.district} onChange={updateStr('district')} placeholder="e.g. Varanasi" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Area Type</label>
                  <select className="input" value={formData.areaType} onChange={updateStr('areaType')}>
                    <option value="Rural">Rural</option>
                    <option value="Urban">Urban</option>
                  </select>
                </div>
                <div>
                  <label className="label">Marital Status</label>
                  <select className="input" value={formData.maritalStatus} onChange={updateStr('maritalStatus')}>
                    {MARITAL.map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Occupation</label>
                <select className="input" value={formData.occupation} onChange={updateStr('occupation')}>
                  <option value="">Select Occupation</option>
                  {ALL_OCCUPATIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="label">Number of Family Members</label>
                <input className="input" type="number" value={formData.familyMembers || ''} onChange={updateNum('familyMembers')} placeholder="e.g. 4" />
              </div>
              <div>
                <label className="label">Annual Household Income (₹)</label>
                <input className="input" type="number" value={formData.householdIncome || ''} onChange={updateNum('householdIncome')} placeholder="e.g. 180000" />
                <p className="text-xs text-neutral-400 mt-1.5">Enter approximate total annual income for your household.</p>
              </div>
              <div>
                <label className="label">Number of Dependents</label>
                <input className="input" type="number" value={formData.dependents || ''} onChange={updateNum('dependents')} placeholder="e.g. 3" />
              </div>
              <div>
                <label className="label">Existing Benefits (if any)</label>
                <input className="input" value={formData.existingBenefits} onChange={updateStr('existingBenefits')} placeholder="e.g. Ration card, BPL card, etc." />
              </div>
              <div>
                <label className="label">Do you have a BPL / Antyodaya card?</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => update('hasBplCard', true)}
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${formData.hasBplCard ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-neutral-200 text-neutral-600'}`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => update('hasBplCard', false)}
                    className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${!formData.hasBplCard ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-neutral-200 text-neutral-600'}`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-neutral-600 mb-2">Additional information helps us find more relevant schemes. Answer what applies to you.</p>

              {/* Conditional: Farmer fields */}
              {derivedIsFarmer && (
                <div className="rounded-xl border border-primary-100 bg-primary-50/30 p-4 space-y-3">
                  <p className="text-sm font-semibold text-primary-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500" /> Farmer Details
                  </p>
                  <div>
                    <label className="label">Landholding Type</label>
                    <select className="input" value={formData.landholding || ''} onChange={updateStr('landholding')}>
                      <option value="">Select Landholding</option>
                      {LANDHOLDING_TYPES.map((l) => <option key={l}>{l}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Conditional: Student fields */}
              {derivedIsStudent && (
                <div className="rounded-xl border border-primary-100 bg-primary-50/30 p-4 space-y-3">
                  <p className="text-sm font-semibold text-primary-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-500" /> Student Details
                  </p>
                  <div>
                    <label className="label">Education Level</label>
                    <select className="input" value={formData.educationLevel || ''} onChange={updateStr('educationLevel')}>
                      <option value="">Select Education Level</option>
                      {EDUCATION_LEVELS.map((e) => <option key={e}>{e}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Conditional: Senior citizen */}
              {derivedIsSenior && (
                <div className="rounded-xl border border-success-100 bg-success-50/30 p-4">
                  <p className="text-sm font-semibold text-success-700 flex items-center gap-1.5">
                    <Check className="w-4 h-4" /> Senior Citizen (60+)
                  </p>
                  <p className="text-xs text-neutral-500 mt-1">You may be eligible for senior citizen pension and social security schemes.</p>
                </div>
              )}

              {/* General conditional fields */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => update('hasDisability', !formData.hasDisability)}
                  className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium transition-all text-left ${formData.hasDisability ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-neutral-200 text-neutral-600'}`}
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${formData.hasDisability ? 'border-primary-600 bg-primary-600' : 'border-neutral-300'}`}>
                    {formData.hasDisability && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  Person with Disability
                </button>

                <button
                  type="button"
                  onClick={() => update('isWomanHeadedHousehold', !formData.isWomanHeadedHousehold)}
                  className={`flex items-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-medium transition-all text-left ${formData.isWomanHeadedHousehold ? 'border-primary-600 bg-primary-50 text-primary-700' : 'border-neutral-200 text-neutral-600'}`}
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${formData.isWomanHeadedHousehold ? 'border-primary-600 bg-primary-600' : 'border-neutral-300'}`}>
                    {formData.isWomanHeadedHousehold && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  Woman-Headed Household
                </button>
              </div>

              {/* Consent */}
              <div className="rounded-xl border border-neutral-200 p-4 mt-2">
                <button
                  type="button"
                  onClick={() => update('consent', !formData.consent)}
                  className="flex items-start gap-3 text-left w-full"
                >
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 ${formData.consent ? 'border-primary-600 bg-primary-600' : 'border-neutral-300'}`}>
                    {formData.consent && <Check className="w-3.5 h-3.5 text-white" />}
                  </div>
                  <span className="text-sm text-neutral-600 leading-relaxed">
                    I consent to NYAYASETU using my information to find relevant welfare schemes. My data will only be used for scheme matching and will not be shared without my permission.
                  </span>
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-6">
              <div className="w-16 h-16 rounded-full bg-success-50 flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-success-600" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">Profile Information Saved</h3>
              <p className="text-sm text-neutral-500 mb-6 max-w-sm mx-auto">
                Now let's find schemes relevant to <span className="font-semibold text-neutral-700">{formData.name || 'you'}</span>.
              </p>
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <button onClick={() => navigate('schemes')} className="btn-primary btn-lg">
                  <Search className="w-5 h-5" />
                  Find My Schemes
                </button>
                <button onClick={() => navigate('documents')} className="btn-secondary">
                  <FileText className="w-5 h-5" />
                  Go to Documents
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        {step < 4 && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              className={`btn-secondary ${step === 1 ? 'invisible' : ''}`}
            >
              <ChevronLeft className="w-4 h-4" />
              {t('common.back')}
            </button>
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="btn-primary">
                {t('common.saveContinue')}
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={handleSave} disabled={!formData.consent} className="btn-primary">
                {t('common.saveContinue')}
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
