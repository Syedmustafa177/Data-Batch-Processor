# Data Batch Processor

A web application built with Next.js that helps users process and batch large sets of data efficiently. The application can automatically group data by prefixes and split it into manageable batches.

![Data Batch Processor](https://raw.githubusercontent.com/Syedmustafa177/Data-Batch-Processor/main/public/preview.png)

## Features

- **Flexible Data Input**: Paste your data with one entry per line
- **Customizable Separator**: Choose any separator for your batched output (default: comma)
- **Adjustable Batch Size**: Set your preferred batch size (default: 500)
- **Automatic Grouping**: Option to group data by first 3 characters of each entry
- **Copy to Clipboard**: Easily copy individual batches with a single click
- **Real-time Processing**: Instant results with loading indicators
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Live Demo

Check out the live demo: [Data Batch Processor](https://data-batch-processor.vercel.app/)

## Tech Stack

- [Next.js 15.0](https://nextjs.org/) - React Framework
- [React 19.0](https://reactjs.org/) - UI Library
- [TailwindCSS](https://tailwindcss.com/) - Styling
- [Lucide React](https://lucide.dev/) - Icons
- TypeScript - Type Safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Syedmustafa177/Data-Batch-Processor.git
```

2. Navigate to the project directory:
```bash
cd Data-Batch-Processor
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

1. **Input Data**: Paste your data in the text area, with one entry per line
2. **Configure Settings**:
   - Set your preferred separator (default is comma)
   - Adjust batch size if needed (default is 500)
   - Toggle "Separate records by first 3 characters" if you want to group similar entries
3. **Process**: Click the "Process Data" button
4. **View Results**: See your data organized into batches
5. **Copy Batches**: Use the "Copy" button next to each batch to copy to clipboard

Example Input:
```
ABC123456
ZZZ789012
CL345678
CI901234
20567890
CLM567890
```

## Project Structure

```
├── app/
│   ├── api/
│   │   └── process/
│   │       └── route.js       # API endpoint for data processing
│   ├── layout.tsx             # Root layout component
│   └── page.js                # Main page component
├── components/
│   └── Footer.tsx             # Footer component
├── public/                    # Static assets
├── styles/
│   └── globals.css           # Global styles
└── utils/
    └── helpers.js            # Helper functions
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Syed Mustafa Ali - [@syedmustafa177](https://twitter.com/syedmustafa177)

- LinkedIn: [syedmustafa177](https://www.linkedin.com/in/syedmustafa177/)
- Portfolio: [syedmustafa177.github.io/Portfolio-website](https://syedmustafa177.github.io/Portfolio-website/)
- GitHub: [Syedmustafa177](https://github.com/Syedmustafa177)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
