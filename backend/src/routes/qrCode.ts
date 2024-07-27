import express from "express";
import { v4 as uuidv4 } from "uuid";
import { qrCodeOptions } from "../config/qrCodeOptions";
import { QRCode } from "../models/QRCode";
import useragent from "express-useragent";
import { getClientIP, getLocationFromIP } from "../ utils/geoip";
import { Scan } from "../models/Scan";

const router = express.Router();

router.get("/options", (req, res) => {
  res.json(qrCodeOptions);
});

router.post("/", async (req, res, next) => {
  try {
    const qrCodeData = { ...req.body, id: uuidv4() };
    const qrCode = new QRCode(qrCodeData);
    await qrCode.save();
    res.status(201).json({ success: true, id: qrCode.id });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const qrCode = await QRCode.findOne({ id });

    if (!qrCode) {
      return res
        .status(404)
        .json({ success: false, message: "QR code not found" });
    }

    // Log the scan
    const clientIP = getClientIP(req);
    const location = getLocationFromIP(clientIP);
    const ua = useragent.parse(req.headers["user-agent"] as string);

    const scan = new Scan({
      qrCodeId: id,
      ipAddress: clientIP,
      userAgent: req.headers["user-agent"],
      country: location.country,
      region: location.region,
      city: location.city,
      latitude: location.ll ? location.ll[0] : null,
      longitude: location.ll ? location.ll[1] : null,
      deviceType: ua.isMobile ? "Mobile" : ua.isTablet ? "Tablet" : "Desktop",
      browser: ua.browser,
    });

    await scan.save();

    // Increment the scan count
    if (qrCode) {
      qrCode.scans = (qrCode.scans || 0) + 1;
      await qrCode.save();
    }

    res.json({ success: true, data: qrCode });
  } catch (error) {
    next(error);
  }
});

export default router;
