import React, { useEffect, useState } from 'react';
import { BadgeCard } from './BadgeCard';
import { Card } from '../shared';
import type { Badge } from '../../types/badge.types';
import { BadgeService } from '../../services/badge.service';

export const BadgeList: React.FC = () => {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBadges = async () => {
      const badgeData = await BadgeService.getBadges();
      setBadges(badgeData);
      setLoading(false);
    };

    loadBadges();

    const unsubscribe = BadgeService.subscribe((updatedBadges) => {
      setBadges([...updatedBadges]);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Card>
        <p className="text-gray-600">Loading badges...</p>
      </Card>
    );
  }

  const earnedBadges = badges.filter(b => b.earned);
  const unearnedBadges = badges.filter(b => !b.earned);

  return (
    <div className="space-y-6">
      {earnedBadges.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Earned Badges ({earnedBadges.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {earnedBadges.map(badge => (
              <BadgeCard key={badge.id} badge={badge} size="md" />
            ))}
          </div>
        </Card>
      )}

      {unearnedBadges.length > 0 && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Locked Badges ({unearnedBadges.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {unearnedBadges.map(badge => (
              <BadgeCard key={badge.id} badge={badge} size="md" />
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};
