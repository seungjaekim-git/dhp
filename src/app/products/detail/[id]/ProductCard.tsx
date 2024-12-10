import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Star,
    ChevronDown,
    BookOpen,
    Users,
    Clock,
    Tag,
    Heart,
  } from "lucide-react";
  import React from "react";
  export default function CourseCard() {
    return (
      <Card className="w-full max-w-[400px] rounded-[20px]">
        <CardHeader className="space-y-4">
          <div className="flex items-center justify-between rounded-l-2xl rounded-r-lg hover:bg-slate-200">
            <div className="flex items-center gap-3">
              <img
                src="/images/macroblock.png"
                alt="Instructor"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium">Macroblock</h4>
                <p className="text-sm text-muted-foreground">Taiwan / LED Driver IC</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Follow
            </Button>
          </div>
  
          <div>
            <h3 className="text-xl font-semibold">Advanced React Development</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Master modern React with hooks, context, and advanced patterns
            </p>
          </div>
  
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-current text-yellow-400" />
              <span className="ml-1 text-sm font-medium">4.8</span>
            </div>
            <Badge variant="secondary">Bestseller</Badge>
          </div>
        </CardHeader>
  
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">$89.99</span>
              <span className="ml-2 text-sm line-through text-muted-foreground">
                $129.99
              </span>
            </div>
            <Badge variant="destructive">30% OFF</Badge>
          </div>
  
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">12 Modules</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Intermediate</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">24 Hours</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">JavaScript</span>
            </div>
          </div>
  
          <Separator />
  
          <Select defaultValue="standard">
            <SelectTrigger>
              <SelectValue placeholder="Select package" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard Package</SelectItem>
              <SelectItem value="premium">Premium Package</SelectItem>
              <SelectItem value="enterprise">Enterprise Package</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
  
        <CardFooter className="flex flex-col gap-4">
          <div className="flex w-full items-center justify-between">
            <span className="text-lg font-semibold">Total Price:</span>
            <span className="text-xl font-bold text-primary">$89.99</span>
          </div>
  
          <div className="flex w-full gap-4">
            <Button className="flex-1">Buy Now</Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  }
