import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';
import { Button } from '../components/Button';
import { HABIT_COLORS, HABIT_ICONS } from '../utils/constants';
import clsx from 'clsx';
import { getTranslation } from '../utils/i18n';

export const AddEditHabitPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { habits, addHabit, updateHabit, deleteHabit, language } = useHabitStore();
  const t = (key: string) => getTranslation(language, key);

  const isEditMode = !!id;
  const existingHabit = isEditMode ? habits.find((h) => h.id === id) : null;

  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    color: string;
    icon: string;
    frequency: 'daily' | 'weekly' | 'monthly';
  }>({
    name: '',
    description: '',
    color: HABIT_COLORS[3].value,
    icon: HABIT_ICONS[0].value,
    frequency: 'daily',
  });

  const nameInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (existingHabit) {
      setFormData({
        name: existingHabit.name,
        description: existingHabit.description,
        color: existingHabit.color,
        icon: existingHabit.icon,
        frequency: existingHabit.frequency,
      });
    }
  }, [existingHabit]);

  // Handle custom validation message
  const handleInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
    e.currentTarget.setCustomValidity(t('fieldRequired'));
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.setCustomValidity('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check form validity and show native validation messages
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!formData.name.trim()) {
      return;
    }

    try {
      if (isEditMode && id) {
        await updateHabit(id, formData);
      } else {
        await addHabit(formData);
      }
      navigate('/');
    } catch (error) {
      // Error is handled in store with toast
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    if (window.confirm(t('confirmDelete'))) {
      try {
        await deleteHabit(id);
        navigate('/');
      } catch (error) {
        // Error is handled in store
      }
    }
  };

  const getIconComponent = (iconName: string) => {
    const IconComponent = (Icons as any)[
      iconName.split('-').map((word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join('')
    ] || Icons.Circle;
    return IconComponent;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-900 dark:text-gray-100" />
          </button>
          <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {isEditMode ? t('editHabit') : t('addHabit')}
          </h1>
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('habitName')} *
          </label>
          <input
            ref={nameInputRef}
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            onInput={handleInput}
            onInvalid={handleInvalid}
            placeholder={t('habitNamePlaceholder')}
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            {t('description')} ({t('optional')})
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder={t('habitDescriptionPlaceholder')}
            rows={3}
            className="input-field dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 resize-none"
          />
        </div>

        {/* Color Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {t('selectColor')}
          </label>
          <div className="grid grid-cols-4 gap-3">
            {HABIT_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setFormData({ ...formData, color: color.value })}
                className={clsx(
                  'aspect-square rounded-xl transition-all duration-200',
                  formData.color === color.value
                    ? 'ring-4 ring-offset-2 scale-110'
                    : 'hover:scale-105'
                )}
                style={{
                  backgroundColor: color.value,
                  ...(formData.color === color.value && {
                    '--tw-ring-color': color.value,
                  } as React.CSSProperties),
                }}
              >
                <span className="sr-only">{color.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Icon Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            {t('selectIcon')}
          </label>
          <div className="grid grid-cols-4 gap-3">
            {HABIT_ICONS.map((icon) => {
              const IconComponent = getIconComponent(icon.value);
              return (
                <button
                  key={icon.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: icon.value })}
                  className={clsx(
                    'aspect-square rounded-xl border-2 transition-all duration-200 flex items-center justify-center',
                    formData.icon === icon.value
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 scale-110'
                      : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:scale-105'
                  )}
                >
                  <IconComponent
                    size={24}
                    className={
                      formData.icon === icon.value
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border-2 border-primary-100 dark:border-primary-900/30">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">{t('preview')}</p>
          <div className="flex items-center space-x-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-sm"
              style={{ backgroundColor: formData.color + '20' }}
            >
              {React.createElement(getIconComponent(formData.icon), {
                size: 32,
                color: formData.color,
              })}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                {formData.name || t('habitName')}
              </h3>
              {formData.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{formData.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3 pt-4">
          <Button type="submit" variant="primary" fullWidth size="lg">
            <Save size={20} />
            <span>{isEditMode ? t('save') : t('addHabit')}</span>
          </Button>

          {isEditMode && (
            <Button
              type="button"
              variant="danger"
              fullWidth
              size="lg"
              onClick={handleDelete}
            >
              <Trash2 size={20} />
              <span>{t('deleteHabit')}</span>
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};
