export const handleProviderRouting = (navigation, verificationStatus, registrationFeeStatus, isRegistrationFree) => {

    if (verificationStatus === 'unsubmitted') {
        return navigation.replace('ProviderSetup');
    }
    if (verificationStatus === 'pending') {
        return navigation.replace('PendingApproval');
    }
    if (verificationStatus === 'rejected') {
        return navigation.replace('AccountRejectedScreen');
    }

    if (verificationStatus === 'approved') {
        if (isRegistrationFree === true) {
            return navigation.replace('ProviderTabNavigator');
        }

        if (registrationFeeStatus === 'paid') {
            return navigation.replace('ProviderTabNavigator');
        } else if (registrationFeeStatus === 'pending_approval') {
            return navigation.replace('PaymentStatusScreen', { status: 'pending_approval' });
        } else {
            return navigation.replace('PaymentUploadScreen', {type: 'registration',});
        }
    }
};