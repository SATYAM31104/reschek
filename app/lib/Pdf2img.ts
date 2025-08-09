export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
  }
  
  let pdfjsLib: any = null;
  let isLoading = false;
  let loadPromise: Promise<any> | null = null;
  
  async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;
  
    isLoading = true;
    try {
      // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
      const lib = await import("pdfjs-dist/build/pdf.mjs");
      
      // Try multiple worker sources for compatibility
      const workerSources = [
        "/pdf.worker.min.mjs",
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${lib.version}/pdf.worker.min.mjs`,
        "https://unpkg.com/pdfjs-dist@latest/build/pdf.worker.min.mjs"
      ];
      
      lib.GlobalWorkerOptions.workerSrc = workerSources[0];
      
      console.log('PDF.js version:', lib.version);
      console.log('Worker source:', lib.GlobalWorkerOptions.workerSrc);
      
      // Test if worker loads correctly
      try {
        const testDoc = await lib.getDocument({ data: new Uint8Array([37, 80, 68, 70]) }).promise;
      } catch (testError) {
        console.warn('Worker test failed, trying CDN fallback');
        lib.GlobalWorkerOptions.workerSrc = workerSources[1];
      }
      
      pdfjsLib = lib;
      isLoading = false;
      loadPromise = null;
      return lib;
    } catch (error) {
      console.error('Failed to load PDF.js:', error);
      isLoading = false;
      loadPromise = null;
      throw new Error(`Failed to load PDF.js library: ${error instanceof Error ? error.message : String(error)}`);
    }
  }
  
  export async function convertPdfToImage(
    file: File
  ): Promise<PdfConversionResult> {
    try {
      // Validate file type
      if (!file.type.includes('pdf') && !file.name.toLowerCase().endsWith('.pdf')) {
        return {
          imageUrl: "",
          file: null,
          error: "File is not a PDF",
        };
      }

      // Validate file size (max 20MB)
      if (file.size > 20 * 1024 * 1024) {
        return {
          imageUrl: "",
          file: null,
          error: "PDF file is too large (max 20MB)",
        };
      }

      console.log('Loading PDF.js library...');
      const lib = await loadPdfJs();
      
      console.log('Reading PDF file...');
      const arrayBuffer = await file.arrayBuffer();
      
      console.log('Parsing PDF document...');
      const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
      
      console.log('Getting first page...');
      const page = await pdf.getPage(1);
  
      const viewport = page.getViewport({ scale: 2 }); // Reduced scale for better performance
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) {
        return {
          imageUrl: "",
          file: null,
          error: "Failed to get canvas context",
        };
      }
  
      canvas.width = viewport.width;
      canvas.height = viewport.height;
  
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
  
      console.log('Rendering PDF page to canvas...');
      await page.render({ canvasContext: context, viewport }).promise;
  
      return new Promise((resolve) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Create a File from the blob with the same name as the pdf
              const originalName = file.name.replace(/\.pdf$/i, "");
              const imageFile = new File([blob], `${originalName}.png`, {
                type: "image/png",
              });

              console.log('PDF converted successfully to image');
              resolve({
                imageUrl: URL.createObjectURL(blob),
                file: imageFile,
              });
            } else {
              resolve({
                imageUrl: "",
                file: null,
                error: "Failed to create image blob from canvas",
              });
            }
          },
          "image/png",
          0.9 // Slightly reduced quality for better performance
        );
      });
    } catch (err) {
      console.error('PDF conversion error:', err);
      return {
        imageUrl: "",
        file: null,
        error: `Failed to convert PDF: ${err instanceof Error ? err.message : String(err)}`,
      };
    }
  }