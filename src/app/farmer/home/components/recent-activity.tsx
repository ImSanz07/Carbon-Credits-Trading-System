import { Leaf, TrendingUp } from "lucide-react";

export function RecentActivity() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 mr-4">
          <Leaf className="h-5 w-5 text-green-700" />
        </div>
        <div className="space-y-1 flex-1">
          <p className="text-sm font-medium leading-none">
            Carbon credits issued: 50 credits
          </p>
          <p className="text-sm text-muted-foreground">15th May, 2024</p>
        </div>
        <div className="ml-auto font-medium text-green-700">+₹36,000</div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 mr-4">
          <TrendingUp className="h-5 w-5 text-green-700" />
        </div>
        <div className="space-y-1 flex-1">
          <p className="text-sm font-medium leading-none">
            Soil carbon level increased by 0.2%
          </p>
          <p className="text-sm text-muted-foreground">10th May, 2024</p>
        </div>
        <div className="ml-auto font-medium text-green-700">+5 credits</div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 mr-4">
          <Leaf className="h-5 w-5 text-green-700" />
        </div>
        <div className="space-y-1 flex-1">
          <p className="text-sm font-medium leading-none">
            Sustainable farming practice verified
          </p>
          <p className="text-sm text-muted-foreground">5th May, 2024</p>
        </div>
        <div className="ml-auto font-medium text-green-700">+8 credits</div>
      </div>
      <div className="flex items-center">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-100 mr-4">
          <Leaf className="h-5 w-5 text-green-700" />
        </div>
        <div className="space-y-1 flex-1">
          <p className="text-sm font-medium leading-none">
            Documentation completed
          </p>
          <p className="text-sm text-muted-foreground">1st May, 2024</p>
        </div>
        <div className="ml-auto font-medium text-green-700">Verified</div>
      </div>
    </div>
  );
}
