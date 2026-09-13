export const handleProviderRouting = (
  navigation,
  verificationStatus,
  registrationFeeStatus,
  isRegistrationFree
) => {
  // Helper to completely clear stack history and navigate
  const resetTo = (routeName, params = {}) => {
    navigation.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    });
  };

  if (verificationStatus === 'unsubmitted') {
    return resetTo('ProviderSetup');
  }

  if (verificationStatus === 'pending') {
    return resetTo('PendingApproval');
  }

  if (verificationStatus === 'rejected') {
    return resetTo('AccountRejectedScreen');
  }

  if (verificationStatus === 'approved') {
    // Free registration check or already paid
    if (isRegistrationFree || registrationFeeStatus === 'paid') {
      return resetTo('ProviderTabNavigator');
    }

    if (registrationFeeStatus === 'pending_approval') {
      return resetTo('PaymentStatusScreen', { status: 'pending_approval' });
    }

    return resetTo('PaymentUploadScreen', { type: 'registration' });
  }
};