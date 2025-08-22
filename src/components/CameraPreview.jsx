import { useEffect, useRef, useState } from "react"

function CameraPreview({ productImage, onClose }) {
  const videoRef = useRef(null)
  const [position, setPosition] = useState({ x: 50, y: 80 })
  const [size, setSize] = useState(150)
  const [rotation, setRotation] = useState(0) // 👈 زاوية الدوران
  const [dragging, setDragging] = useState(false)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [initialPinchDistance, setInitialPinchDistance] = useState(null)
  const [initialAngle, setInitialAngle] = useState(null)
  const [initialSize, setInitialSize] = useState(size)
  const [initialRotation, setInitialRotation] = useState(rotation)

  useEffect(() => {
    let stream
    async function enableCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true })
        videoRef.current.srcObject = stream
      } catch (err) {
        console.error("خطأ في تشغيل الكاميرا:", err)
      }
    }
    enableCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  // 🖱️ السحب بالماوس
  const handleMouseDown = (e) => {
    setDragging(true)
    const rect = e.target.getBoundingClientRect()
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }

  const handleMouseMove = (e) => {
    if (dragging) {
      const videoRect = videoRef.current.getBoundingClientRect()
      const x = ((e.clientX - videoRect.left - offset.x) / videoRect.width) * 100
      const y =
        ((e.clientY - videoRect.top - offset.y) / videoRect.height) * 100
      setPosition({ x, y })
    }
  }

  const handleMouseUp = () => setDragging(false)

  // 📱 السحب والتكبير/التصغير + التدوير باللمس
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      // 🖐️ إصبع واحد = سحب
      const rect = e.target.getBoundingClientRect()
      setDragging(true)
      setOffset({
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      })
    } else if (e.touches.length === 2) {
      // ✌️ إصبعين = تكبير + تدوير
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const distance = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx) * (180 / Math.PI)

      setInitialPinchDistance(distance)
      setInitialSize(size)
      setInitialAngle(angle)
      setInitialRotation(rotation)
    }
  }

  const handleTouchMove = (e) => {
    const videoRect = videoRef.current.getBoundingClientRect()

    if (e.touches.length === 1 && dragging) {
      // 🖐️ السحب
      const x =
        ((e.touches[0].clientX - videoRect.left - offset.x) /
          videoRect.width) *
        100
      const y =
        ((e.touches[0].clientY - videoRect.top - offset.y) /
          videoRect.height) *
        100
      setPosition({ x, y })
    } else if (e.touches.length === 2 && initialPinchDistance && initialAngle !== null) {
      // ✌️ التكبير + التدوير
      const dx = e.touches[0].clientX - e.touches[1].clientX
      const dy = e.touches[0].clientY - e.touches[1].clientY
      const newDistance = Math.sqrt(dx * dx + dy * dy)
      const newAngle = Math.atan2(dy, dx) * (180 / Math.PI)

      // تكبير
      const scale = newDistance / initialPinchDistance
      setSize(Math.max(50, initialSize * scale))

      // تدوير
      const rotationDelta = newAngle - initialAngle
      setRotation(initialRotation + rotationDelta)
    }
  }

  const handleTouchEnd = () => {
    setDragging(false)
    setInitialPinchDistance(null)
    setInitialAngle(null)
  }

  // أزرار تكبير/تصغير وتدوير عادي
  const increaseSize = () => setSize((s) => s + 20)
  const decreaseSize = () => setSize((s) => Math.max(50, s - 20))
  const rotateLeft = () => setRotation((r) => r - 15)
  const rotateRight = () => setRotation((r) => r + 15)

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>الكاميرا شغالة ✅</h3>
      <div
        style={{ position: "relative", display: "inline-block" }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{
            width: "100%",
            maxWidth: "400px",
            borderRadius: "10px",
            border: "2px solid #ddd"
          }}
        />

        {productImage && (
          <img
            src={productImage}
            alt="Product Overlay"
            style={{
              position: "absolute",
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
              width: `${size}px`,
              cursor: "grab",
              opacity: 0.9,
              touchAction: "none"
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          />
        )}
      </div>

      <div style={{ marginTop: "15px" }}>
        <button
          onClick={increaseSize}
          style={{ marginRight: "10px", background: "#4CAF50", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}
        >
          تكبير 🔍
        </button>

        <button
          onClick={decreaseSize}
          style={{ marginRight: "10px", background: "#2196F3", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}
        >
          تصغير 🔽
        </button>

        <button
          onClick={rotateLeft}
          style={{ marginRight: "10px", background: "#FF9800", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}
        >
          تدوير ⏪
        </button>

        <button
          onClick={rotateRight}
          style={{ marginRight: "10px", background: "#FF9800", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}
        >
          تدوير ⏩
        </button>

        <button
          onClick={onClose}
          style={{ background: "#e63946", color: "#fff", border: "none", padding: "8px 12px", borderRadius: "5px", cursor: "pointer" }}
        >
          إغلاق الكاميرا ❌
        </button>
      </div>
    </div>
  )
}

export default CameraPreview
