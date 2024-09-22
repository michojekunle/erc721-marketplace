import { Button } from "@/components/ui/button";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NFTMarketplace() {
  const collections = [
    {
      id: 1,
      name: "Abstract Shapes",
      price: "0.25 ETH",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abstract-shapes-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
    {
      id: 2,
      name: "Neon Sculpture",
      price: "0.3 ETH",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/neon-sculpture-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
    {
      id: 3,
      name: "Pastel Sphere",
      price: "0.2 ETH",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pastel-sphere-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
    {
      id: 4,
      name: "Vibrant Cubes",
      price: "0.35 ETH",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vibrant-cubes-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
    {
      id: 5,
      name: "Monochrome Figure",
      price: "0.28 ETH",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/monochrome-figure-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
    {
      id: 6,
      name: "Golden Ratio",
      price: "0.4 ETH",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/golden-ratio-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
    {
      id: 7,
      name: "Cartoon Character",
      price: "0.22 ETH",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cartoon-character-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
    {
      id: 8,
      name: "Abstract Lines",
      price: "0.33 ETH",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abstract-lines-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
    {
      id: 9,
      name: "Geometric Arch",
      price: "0.27 ETH",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/geometric-arch-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
  ];

  const featuredArtworks = [
    {
      id: 1,
      name: "Cubic Harmony",
      artist: "Alex Cubic",
      price: "0.5 ETH",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cubic-harmony-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
    {
      id: 2,
      name: "Neon Dreams",
      artist: "Neon Artist",
      price: "0.7 ETH",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/neon-dreams-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
    {
      id: 3,
      name: "Pastel Perfection",
      artist: "Pastel Master",
      price: "0.6 ETH",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pastel-perfection-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
  ];

  const topCreators = [
    {
      id: 1,
      name: "Digital Dynamo",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creator1-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
    {
      id: 2,
      name: "Pixel Prodigy",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creator2-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
    {
      id: 3,
      name: "Crypto Creative",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/creator3-UKEdwjD3wKGoGGMT25eCFc9GrYEw5X.png",
    },
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-[-10%] to-[50%] from-[#984D38] to-[#181E41] text-white">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Amd Xvm NFT Marketplace</h1>
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-purple-400">
            Home
          </a>
          <a href="#" className="hover:text-purple-400">
            Explore
          </a>
          <a href="#" className="hover:text-purple-400">
            Create
          </a>
        </nav>
        <ConnectButton />
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-20">
          <h2 className="text-5xl font-bold mb-4">
            Create, sell & collect
            <br />
            your own creative NFT
          </h2>
          <p className="text-xl mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-purple-600 hover:bg-purple-500">
              Explore Now
            </Button>
            <Button variant="outline">Create NFT</Button>
          </div>
        </section>

        <section className="mb-20">
          <h3 className="text-3xl font-bold mb-8">About Us</h3>
          <p className="text-lg mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <Button
            variant="link"
            className="text-purple-400 hover:text-purple-300"
          >
            Learn More
          </Button>
        </section>

        <section className="mb-20">
          <h3 className="text-3xl font-bold mb-8">Collections</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={`/placeholder.svg?height=200&width=300`}
                  alt={`Collection ${i + 1}`}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold mb-2">
                    Collection {i + 1}
                  </h4>
                  <p className="text-gray-400">Lorem ipsum dolor sit amet</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-3xl font-bold mb-8">Featured Artworks</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={`/placeholder.svg?height=300&width=400`}
                  alt={`Artwork ${i + 1}`}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-xl font-semibold mb-2">
                    Artwork {i + 1}
                  </h4>
                  <p className="text-gray-400 mb-4">Artist Name</p>
                  <div className="flex justify-between items-center">
                    <span className="text-purple-400">0.5 ETH</span>
                    <Button
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-500"
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <div className="min-h-screen bg-gradient-to-b from-purple-900 to-gray-900 text-white p-8">
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((item) => (
              <Card key={item.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                    <p className="text-purple-400">{item.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Featured Artworks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArtworks.map((artwork) => (
              <Card key={artwork.id} className="bg-gray-800 border-gray-700">
                <CardContent className="p-0">
                  <img
                    src={artwork.image}
                    alt={artwork.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {artwork.name}
                    </h3>
                    <p className="text-gray-400 mb-2">{artwork.artist}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-purple-400">{artwork.price}</span>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Top Creator</h2>
          <div className="flex space-x-4">
            {topCreators.map((creator) => (
              <div key={creator.id} className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-2">
                  <AvatarImage src={creator.image} alt={creator.name} />
                  <AvatarFallback>{creator.name[0]}</AvatarFallback>
                </Avatar>
                <p className="text-sm">{creator.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is an NFT?</AccordionTrigger>
              <AccordionContent>
                NFT stands for Non-Fungible Token. It's a unique digital asset
                that represents ownership of a specific item or piece of content
                on the blockchain.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>How do I create an NFT?</AccordionTrigger>
              <AccordionContent>
                To create an NFT, you need to mint your digital asset on a
                blockchain platform. This process involves uploading your
                content, setting a price, and paying a gas fee to record the
                transaction.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I buy an NFT?</AccordionTrigger>
              <AccordionContent>
                To buy an NFT, you need a digital wallet and cryptocurrency.
                Browse NFT marketplaces, connect your wallet, and make a
                purchase when you find an NFT you like.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="text-center py-16 bg-purple-800 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">
            Get ready to collect our NFT
          </h2>
          <Button
            size="lg"
            className="bg-white text-purple-800 hover:bg-gray-200"
          >
            Create NFT
          </Button>
        </section>
      </div>

      <footer className="bg-gray-900 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2023 NFT Marketplace. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
