import { useState, useEffect } from 'react';
import { usePuterStore } from '~/lib/puter';

interface ResumeImageHandlerProps {
  imagePath: string;
  resumeId: string;
  className?: string;
  alt?: string;
}

const ResumeImageHandler = ({ imagePath, resumeId, className = "", alt = "Resume preview" }: ResumeImageHandlerProps) => {
  const { fs } = usePuterStore();
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadImage = async () => {
      if (!imagePath) {
        setHasError(true);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setHasError(false);
        
        // Try to read the file from Puter's file system
        const fileBlob = await fs.read(imagePath);
        if (fileBlob) {
          const url = URL.createObjectURL(fileBlob);
          setImageUrl(url);
        } else {
          setHasError(true);
        }
      } catch (error) {
        console.error(`Failed to load image for resume ${resumeId}:`, error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();

    // Cleanup function to revoke object URL
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imagePath, resumeId, fs]);

  if (isLoading) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto mb-2"></div>
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (hasError || !imageUrl) {
    return (
      <div className={`${className} flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-dashed border-cyan-200`}>
        <div className="text-center p-4">
          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-700">Resume Preview</p>
          <p className="text-xs text-gray-500 mt-1">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        objectPosition: 'center',
      }}
      onError={() => {
        console.error(`Image failed to render for resume ${resumeId}`);
        setHasError(true);
      }}
    />
  );
};

export default ResumeImageHandler;