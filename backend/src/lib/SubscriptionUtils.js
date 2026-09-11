
const FREE_TIER_SERVICE_LIMIT = 1;

const syncSubscriptionStatus = async (provider) => {
  if (!provider) return provider;

  const sub = provider.subscriptionDetails;

  const isActiveButExpired =
    sub &&
    sub.status === 'active' &&
    sub.expiresAt &&
    new Date(sub.expiresAt) < new Date();

  if (isActiveButExpired) {
    provider.isPremium = false;
    provider.subscriptionDetails.status = 'expired';
    provider.markModified('subscriptionDetails');
    await provider.save();
  }

  return provider;
};

const isCurrentlyPremium = (provider) => {
  return Boolean(
    provider?.isPremium && provider?.subscriptionDetails?.status === 'active'
  );
};

module.exports = {
  FREE_TIER_SERVICE_LIMIT,
  syncSubscriptionStatus,
  isCurrentlyPremium,
};