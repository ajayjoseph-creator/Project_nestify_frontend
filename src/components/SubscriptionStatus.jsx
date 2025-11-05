import React from "react";
import { FaCrown } from "react-icons/fa";

const SubscriptionStatus = ({ subscription }) => {
  if (!subscription || !subscription.active) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-lg mt-4">
        <p className="font-semibold">🚫 No active subscription found.</p>
        <p className="text-sm mt-1">Subscribe to unlock premium features!</p>
      </div>
    );
  }

  const { plan, price, startDate, nextBillingDate } = subscription;
  const remainingDays = Math.ceil(
    (new Date(nextBillingDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const isExpired = remainingDays <= 0;

  if (isExpired) {
    return (
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-lg mt-4">
        <p className="font-semibold">🚫 Subscription expired.</p>
        <p className="text-sm mt-1">Subscribe to continue premium features!</p>
      </div>
    );
  }

  return (
    <div className="bg-green-100 border border-green-400 text-green-800 p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <FaCrown className="text-yellow-500" />
        <h2 className="font-semibold text-lg">Premium Plan Activated</h2>
      </div>

      <p className="mt-2 text-sm">
        Plan: <strong className="capitalize">{plan}</strong>
      </p>
      <p className="text-sm">Price: ₹{price}</p>
      <p className="text-sm">
        Started: {new Date(startDate).toLocaleDateString()}
      </p>
      <p className="text-sm">
        Next Billing: {new Date(nextBillingDate).toLocaleDateString()}
      </p>
      <p className="mt-1 font-semibold text-sm">
        ✅ {remainingDays} days remaining
      </p>
    </div>
  );
};

export default SubscriptionStatus;
