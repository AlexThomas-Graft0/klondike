import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCcw, RotateCcw } from "lucide-react";

const placeholderCard = "/placeholder.svg?height=150&width=100";

export default function Component() {
  return (
    <div className="min-h-screen bg-green-800 p-4 flex flex-col">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-white">Klondike Solitaire</h1>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <RefreshCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
          <Button variant="secondary" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            Undo
          </Button>
        </div>
      </header>

      <div className="flex gap-4 mb-4">
        <Card className="w-[100px] h-[150px] bg-green-700 border-2 border-white">
          <CardContent className="p-2">
            <img
              src={placeholderCard}
              alt="Stock pile"
              className="w-full h-full object-cover"
            />
          </CardContent>
        </Card>
        <Card className="w-[100px] h-[150px] bg-green-700 border-2 border-white">
          <CardContent className="p-2">
            <img
              src={placeholderCard}
              alt="Waste pile"
              className="w-full h-full object-cover"
            />
          </CardContent>
        </Card>
        <div className="flex-grow" />
        {[...Array(4)].map((_, i) => (
          <Card
            key={i}
            className="w-[100px] h-[150px] bg-green-600 border-2 border-white"
          >
            <CardContent className="p-2">
              <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                {String.fromCharCode(9824 + i)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-2 flex-wrap justify-center">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {[...Array(i + 1)].map((_, j) => (
              <Card
                key={j}
                className="w-[100px] h-[150px] bg-white border-2 border-gray-300 -mt-20 first:mt-0"
                style={{ zIndex: j }}
              >
                <CardContent className="p-2">
                  <img
                    src={placeholderCard}
                    alt={`Card ${j + 1} in column ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
