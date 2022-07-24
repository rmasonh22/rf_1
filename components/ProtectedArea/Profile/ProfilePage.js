import MainLayout from "../MainLayout";
import NavigationContainer from "../Navigation/NavigationContainer";
import PageHeader from "../PageHeader";
import DeleteAccount from "./DeleteAccount";
import PersonalInformation from "./PersonalInformation";
import AccountSettings from "./AccountSettings";
import SubscriptionInformation from "./SubscriptionInformation";

function HorizontalLine() {
  return (
    <div className="hidden sm:block" aria-hidden="true">
      <div className="py-5">
        <div className="border-t border-gray-200" />
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <NavigationContainer>
      <MainLayout>
        <PageHeader>Your profile</PageHeader>

        <div className="mt-6">
          <SubscriptionInformation />
          <HorizontalLine />
          <PersonalInformation />
          <HorizontalLine />
          <AccountSettings />
          <HorizontalLine />
          <DeleteAccount />
        </div>
      </MainLayout>
    </NavigationContainer>
  );
}

export default ProfilePage;
