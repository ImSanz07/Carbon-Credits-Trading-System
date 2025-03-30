import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function MarketInsights() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Market Price</p>
                <p className="text-2xl font-bold">₹720</p>
              </div>
              <div className="flex items-center text-green-700">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-xs">+5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Demand Forecast</p>
                <p className="text-2xl font-bold">High</p>
              </div>
              <div className="flex items-center text-green-700">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-xs">+12%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Supply</p>
                <p className="text-2xl font-bold">Moderate</p>
              </div>
              <div className="flex items-center text-red-700">
                <TrendingDown className="h-4 w-4 mr-1" />
                <span className="text-xs">-3%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Market Opportunities</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium">
                Corporate Buyers Seeking Long-term Contracts
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Several corporations are looking for farmers with consistent
                carbon credit generation for 3-5 year contracts.
              </p>
            </div>
            <Button size="sm" variant="outline" className="shrink-0">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              Details
            </Button>
          </div>
          <div className="flex items-start gap-4 p-4 border rounded-lg">
            <div className="flex-1">
              <h4 className="font-medium">
                Premium Pricing for Verified Sustainable Practices
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                Buyers offering 10-15% premium for credits from farms with
                additional certifications.
              </p>
            </div>
            <Button size="sm" variant="outline" className="shrink-0">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
